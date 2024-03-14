import CredentialsProvider from "next-auth/providers/credentials"
import DbConnect from "../../v14/utills";
import { ODALogin } from "../../v14/controllers/oda/route";
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
                
                if (typeof credentials !=='undefined') {

                    await DbConnect();

                    if (isNaN(credentials.username)) {
                        // userData=await loginUser(credentials.username,credentials.password,request)
                        
                        throw new Error('Invalid credentials')
                    } else {
                        userData=await ODALogin(credentials.username,credentials.password,request)
                    }

                }
                else{
                    throw new Error('Invalid credentials')
                }

                if (!userData.success) {
                    throw new Error(userData.message)
                }

                return {
                    ...userData.sessionData
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
                token.role=user.role
                token.access=user.access
                token.level_name=user.level_name
                token.level_code=user.level_code
                token.access_name=user.access_name
            }
            return token
        },
        async session({session,token}){
            if(token){
                session.user.id=token.id
                session.user.name=token.name
                session.user.role=token.role
                session.user.access=token.access
                session.user.level_name=token.level_name
                session.user.level_code=token.level_code
                session.user.access_name=token.access_name
            }
            return session
        }

    }
    
}

export default authOptions