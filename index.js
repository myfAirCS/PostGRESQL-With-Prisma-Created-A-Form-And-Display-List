const express=require("express");

const formMethods=require("./controllers/FormMethods")

const app=express();

const PORT=3030;

app.use(express.static('public'));
app.use(express.json());


app.post("/api/data",formMethods.postData);

app.get("/api/data",formMethods.getDataofAll);

app.get("/api/data/:id",formMethods.getData);

app.put("/api/data/update/:id",formMethods.putRequest);

app.patch("/api/data/update/:id",formMethods.patchRequest);

app.delete("/api/data/:id",formMethods.deleteRequest);


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
