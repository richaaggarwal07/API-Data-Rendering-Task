const http=require('http');
const fs=require("fs");
const server=http.createServer(async (req,res)=>{
        let value=await fetch('https://randomuser.me/api/?results=10')
        let data=await value.json();
        let finalData=data.results;
        if(req.url=="/"){
                res.writeHead(200,{"Content-type":"text/html"});
                res.end(`
                <html>
                <head>
                </head>
                <body>
                <script>
                for(let x of ${JSON.stringify(finalData)})
                {
                    console.log(typeof x);
                    const para = document.createElement('p');
                    para.innerHTML=x.name.title+" "+x.name.first+" "+x.name.last;
                    document.body.appendChild(para);
                }
            </script>
                </body>
                </html
                `);
        }
        else if(req.url=="/search"){
           res.end(`
                <html>
                <body>
                    <form onsubmit="return search()">
                    <label for="fname">Full Name:</label><br>
                    <input type="text" id="fname" name="fname" placeholder="Name"><br>
                    <label for="fname">Email:</label><br>
                    <input type="text" id="email" name="email" placeholder="email" ><br>
                    <label for="fname">Username:</label><br>
                    <input type="text" id="uname" name="uname" placeholder="Username"><br>
                    <input type="submit" value="Submit">
                    <div id="container">
                        <script>
                            for(let x of ${JSON.stringify(finalData)}){
                                let p = document.createElement('p');
                                let value ="Name is "+x.name.first+" "+x.name.last+" <br> "+" Email is "+x.email+"<br>"+"Username is "+x.login.username;
                                p.innerHTML=value;
                                document.getElementById("container").appendChild(p)
                            }
                            function search(){
                                document.getElementById("container").innerHTML=' ';
                                let value=document.getElementById("fname").value;
                                let email=document.getElementById("email").value;
                                let username=document.getElementById("uname").value;
                                const para = document.createElement('p');
                                const img = document.createElement('img');
                                para.innerHTML="Not Available";
                                for(let x of ${JSON.stringify(finalData)}){
                                    let nm=x.name.first+" "+x.name.last;
                                    if((x.name.first.includes(value) || x.name.last.includes(value)||nm==value||value=="")&&(email==""||email==x.email)&&(username==""||username==x.login.username)){
                                        para.innerHTML = x.name.first + " " +  x.name.last;
                                        img.src=x.picture.large;
                                        break;
                                    }
                                }
                                document.getElementById("container").appendChild(para);
                                document.getElementById("container").appendChild(img);
                                return false;
                            }
                    </script>
                    </div>
                    </form>
                <body>
                </html>
           `);
        }
        else if(req.url=="/sort")
        {
                res.end(`
                <html>
                <body>
                    <button onclick="ascending()" id="container1">Ascending</button>
                    <button onclick="descending()" id="container2">Descending</button>
                    <div id="container">
                        <script>
                        let arr=[];
                            for(let x of ${JSON.stringify(finalData)}){
                                let p = document.createElement('p');
                                let value = x.name.first+" "+x.name.last;
                                arr.push(value);
                                p.innerHTML=value;
                                document.getElementById("container").appendChild(p)
                            }
                            function print()
                            {
                                document.getElementById("container").innerHTML=' ';
                                for(let x of arr){
                                    let p = document.createElement('p');
                                    p.innerHTML=x;
                                    document.getElementById("container").appendChild(p)
                                }
                            }
                            function ascending(){
                                arr.sort();
                                print();
                            }
                            function descending(){
                                arr.reverse();
                                print();
                            }
                    </script>
                    </div>
                    </form>
                <body>
                </html>
        `);
        }
            else{
                res.writeHead(404,{"Content-type":"text/html"});
                res.end("there is error")
            }
    }
);
server.listen(5000,()=>{
    console.log('server is running')
})