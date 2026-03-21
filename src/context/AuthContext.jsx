import { createContext, useState  } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children}){
    const [user, setUser] = useState(
        localStorage.getItem("currentUserEmail") ? 
        {email: localStorage.getItem("currentUserEmail")} : null
    );

function signUp(email, password) {
    
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    console.log("users from storage:", users);
        
    if (users.find((u) => u.email === email)) {
        return { success: false, error: "Email already exists" };
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);
    setUser(newUser); 
    return { success: true };
    
}

    function login(email, password){
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const found = users.find(
            (u) => u.email === email && u.password === password
        )

        if(!found){
            return { success: false, error: "Invalid email for password"}
        }

        localStorage.setItem("currentUserEmail", email)
        setUser(found);
        return {success: true};
    }

    function logout(){ 
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return <AuthContext.Provider value={{ user , signUp , login , logout}}>{children}</AuthContext.Provider>
}