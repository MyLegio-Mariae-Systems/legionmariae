import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import DbConnect from "../../v14/utills";
// import { loginUser } from "../../v1/controller/user/route";

const authOptions={
    session:{
        strategy:'jwt',
        maxAge: 60*60

    },
    providers:[
        CredentialsProvider({
            type:'credentials',
            credentials:{username:{},password:{}},
            async authorize(credentials,request){

                // console.log(credentials);

                let userData
                
                // if (typeof credentials !=='undefined') {

                    // await DbConnect();

                //     userData=await loginUser(credentials.username,credentials.password,request)
                // }
                // else{
                //     throw new Error('Invalid credentials')
                // }

                // if (!userData.success) {
                //     throw new Error(userData.message)
                // }

                
                // return {
                //     id:userData.user.id,
                //     access:userData.access,
                //     name:userData.user.firstName+' '+userData.user.lastName,
                //     email:userData.butchery.email,
                //     butcheryName:userData.butchery.name,
                //     branch:userData.user.branch,
                //     package:userData.branch.subscription[0].package,
                //     branchName:userData.branch.name,
                //     phone:userData.butchery.country[0].phoneCode+userData.butchery.mobile
                // }

                return {
                    id:'123456789012345678901234',
                    name:'Meshack',
                    email:'btgavygarvey@gmail.com',
                }

            }
        })
        
    ],
    // database:process.env.DB_URL,
    pages:{
        signOut:'/'
    },
    callbacks:{
        async jwt({token,user}){

            if(user){
                token.id=user.id
                token.name=user.name
                token.email=user.email
            }
            return token
        },
        async session({session,token}){
            if(token){
                session.user.id=token.id
                session.user.name=token.name
                session.user.email=token.email
            }
            return session
        }

    }
    
}

export default authOptions