
app.get("/api/data",formMethods.getDataofAll);

app.get("/api/data/:id",formMethods.getData);

app.put("/api/data/update/:id",formMethods.putRequest);

app.patch("/api/data/update/:id",formMethods.patchRequest);

app.delete("/api/data/:id",formMethods.deleteRequest);
