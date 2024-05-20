
const {PrismaClient}=require("@prisma/client");
 const Prisma=new PrismaClient();

 async function postData(request,response){
    
    try{const formData=request.body;

    const postedData= await Prisma.form.create({
        data:{
            f_name:formData.f_name,
            l_name:formData.l_name,
            country:formData.country,
            dob:formData.dob,
            email:formData.email,
            ph_Num:formData.ph_Num
        }
    }
)

const Data=await Prisma.form.findUnique({
    where:{
        email:formData.email
    }
})

console.log(Data);

response.status(200).json({
    msg:"Database Updated",
    Data
})
} catch(err)
 {
    console.error(err.message);
 }
 
}

async function getDataofAll(request,response){
    try {
        const Data= await Prisma.form.findMany();

        response.status(200).json({
            msg:"Data Fetched",
            Data
        })

    } catch (error) {
        console.error(error.message);
    }
}

async function getData(request,response){
    const {id}=request.params
    try {
        const Data= await Prisma.form.findUnique({
            where:{
                id:parseInt(id)
            }
        });

        response.status(200).json({
            msg:"Data Fetched",
            Data
        })

    } catch (error) {
        console.error(error.message);
    }
}

async function putRequest(request,response){
    
    const {id}=request.params;
    const formData=request.body;


    try {
    
        const updateData=await Prisma.form.update({
                where:{
                    id:parseInt(id)    
                },
                data:{
                    ...formData
                }

        })

        const newData=await Prisma.form.findUnique({
            where:{
                id:parseInt(id)
            },
        })

        response.status(200).json({
            msg:"Data Updated",
            newData
        })
    } catch (error) {

        console.error(error.message);
    
    }
}

async function patchRequest(request,response){
    const {id}=request.params;
    const {body}=request;
    try {
        const newData=await Prisma.form.update({
            where:{
                id:parseInt(id)
            },
            data:{
                ...body
            }
        })
        response.status(200).json({
            msg:`Data Updated For User Having ID : ${id} `,
            newData
        })
    } catch (error) {
        console.error(error.message)
        response.send(500).json({
            error
        })
    }
};

async function deleteRequest(request,response){
try {

    const {id}=request.params;
    const {email}=request.body;
    const delData=await Prisma.form.delete({
        where:{
           id:parseInt(id),
           email:email
        }
    })

    response.status(201).json({
        msg:`User with id : ${id}  was deleted successfully`,
    })
    
} catch (error) {

    response.status(500)
.json({msg:"Server Error"})
    console.error(
    error.message
    );
    
}
}


module.exports={
    postData,
    getData,
    putRequest,
    patchRequest,
    getDataofAll,
    deleteRequest
}