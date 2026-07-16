import {
  LayoutDashboard,
  Users,
  PawPrint,
  Stethoscope,
  CalendarDays,
  LifeBuoy,
} from "lucide-react";

import { NavLink } from "react-router-dom";


const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Owners",
    path: "/owners",
    icon: Users,
  },
  {
    name: "Pets",
    path: "/pets",
    icon: PawPrint,
  },
  {
    name: "Veterinarians",
    path: "/veterinarians",
    icon: Stethoscope,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: CalendarDays,
  },
];


function Sidebar() {

return (

<aside
className="
flex
h-screen
w-[260px]
shrink-0
flex-col
bg-slate-950
text-white
"
>


{/* Logo */}

<div
className="
border-b
border-slate-800
px-6
py-6
"
>

<div
className="
flex
items-center
gap-3
"
>


<div
className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-cyan-600
"
>

<PawPrint size={25}/>

</div>


<div>

<h1
className="
text-2xl
font-bold
"
>
PawCare
</h1>


<p
className="
text-sm
text-slate-400
"
>
Veterinary Clinic
</p>


</div>


</div>

</div>





<nav
className="
flex-1
space-y-2
px-4
py-6
"
>

{
menuItems.map((item)=>{

const Icon=item.icon;


return(

<NavLink

key={item.path}

to={item.path}

className={({isActive})=>
`
flex
items-center
gap-4
rounded-xl
px-4
py-3
font-medium

${
isActive
?
"bg-cyan-600 text-white"
:
"text-slate-300 hover:bg-slate-800"
}

`
}

>

<Icon size={23}/>

<span>
{item.name}
</span>


</NavLink>


)

})
}


</nav>





<div
className="
px-4
pb-5
"
>

<div
className="
rounded-2xl
bg-slate-900
p-5
"
>


<div
className="
mb-3
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-cyan-600/20
"
>

<LifeBuoy
size={20}
className="text-cyan-400"
/>

</div>



<h3
className="
text-lg
font-semibold
"
>
Need Help?
</h3>


<p
className="
mt-2
text-sm
leading-5
text-slate-400
"
>
Contact the clinic administrator if you need assistance.
</p>


<button
className="
mt-4
w-full
rounded-xl
bg-cyan-600
py-2.5
font-semibold
"
>
Contact Support
</button>


</div>

</div>


</aside>

)

}


export default Sidebar;
