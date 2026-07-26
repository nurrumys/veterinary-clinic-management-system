import type { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";


type DashboardLayoutProps={
children:ReactNode;
};


function DashboardLayout({
children
}:DashboardLayoutProps){


return(

<div
className="
flex
h-screen
bg-slate-100
"
>


<Sidebar/>


<div
className="
flex
flex-1
flex-col
overflow-hidden
"
>


<Header/>


<main
  className="
    flex-1
    overflow-y-auto
    bg-slate-100
    p-6
    min-h-0
  "
>

{children}

</main>


</div>


</div>

)

}


export default DashboardLayout;