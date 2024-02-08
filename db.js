const uri="mongodb+srv://mongodbusername:yourmongodbpassword@tododb.ygf8mas.mongodb.net/?retryWrites=true&w=majority"; //mondo db den alacağımız bağlantı adresidir

var mongoose=require("mongoose");
var Todo=require("./todo");

mongoose.set("strictQuery",false);

mongoose.connect(uri,(err)=>{

if(!err){
    console.log("baglantı basarili");
}

});

const express=require("express");
const app=express();
app.use(express.json());

const cors=require("cors");
app.use(cors({

    credentials:true,
    
    origin:["http://localhost:4200"]

}));

app.get("/api/getall",(req,res)=>{

    Todo.find({},(err,data)=>{
        if(err){
            throw err;
        }

        res.send(data);
    });
});

//ekleme işlemi
app.post("/api/add",(req,res)=>{
    
    const {work}=req.body;

    const todo=new Todo({
        work:work,
        isCompleted:false
    });
    todo.save((err)=>{
        if(err){
            throw err;
        }
        res.send({message:"Todo kaydı başarılı!"});
    });
});

//güncelleme işlemi

app.post("/api/delete",(req,res)=>{
    const todo=new Todo(req.body);

    todo.delete((err)=>{
        if(err){
            throw err;
        }
        res.send({message:"Todo silme işlemi başarılı!"});
    })
})

app.post("/api/update",(req,res)=>{
    const newTodo=new Todo(req.body);
    Todo.findByIdAndUpdate(newTodo._id,newTodo,(err)=>{
        if(err){
            throw err;
        }
        res.send({message:"Todo kaydı başarıyla güncellenedi!"});
    })

})

const port=5000;
app.listen(port,()=>{
    console.log("Site http://localhost:"+port+" üzerinden ayağa kaldırıldı");

});
