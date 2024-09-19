const isEmailRgex = ({key}) => {
    const isEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        key
      );
    return isEmail;
  };





const userDataValidation=({name, email, password})=>{
    return new Promise((resolve, reject)=>{
        if(!name || !email || !password) reject("Missing user credentials")
        if(typeof name !== 'string') reject("Name is not a text")
        if(typeof email !== 'string') reject("Email is not a text")
        if(typeof password !== 'string') reject("Password is not a text")

        if(!isEmailRgex({key: email})) reject("Email format is incorrect")

        resolve()
    })
}

module.exports= userDataValidation