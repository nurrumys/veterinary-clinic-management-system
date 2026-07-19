import {
  Search,
  Download,
  Plus,
} from "lucide-react";


type VeterinarianToolbarProps = {

  search: string;

  specialty: string;

  status: string;

  sort: string;

  onSearchChange: (value:string)=>void;

  onSpecialtyChange:(value:string)=>void;

  onStatusChange:(value:string)=>void;

  onSortChange:(value:string)=>void;

  onAddVeterinarian:()=>void;

};



function VeterinarianToolbar({

  search,

  specialty,

  status,

  sort,

  onSearchChange,

  onSpecialtyChange,

  onStatusChange,

  onSortChange,

  onAddVeterinarian,

}:VeterinarianToolbarProps) {


return (

<div
className="
grid
w-full
grid-cols-12
gap-3
"
>


{/* Search */}

<div
className="
col-span-3
relative
"
>

<Search
size={20}
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
"
/>


<input

value={search}

onChange={(e)=>
onSearchChange(e.target.value)
}

placeholder="Search veterinarians..."

className="
h-12
w-full
rounded-xl
border
border-slate-200
bg-white
pl-11
pr-4
text-sm
text-slate-700
outline-none
focus:border-blue-500
"

/>


</div>





{/* Specialty */}

<div className="col-span-2">

<select

value={specialty}

onChange={(e)=>
onSpecialtyChange(e.target.value)
}

className="
h-12
w-full
rounded-xl
border
border-slate-200
bg-white
px-4
text-sm
text-slate-600
"

>

<option>
All Specialties
</option>

</select>

</div>






{/* Status */}

<div className="col-span-2">

<select

value={status}

onChange={(e)=>
onStatusChange(e.target.value)
}

className="
h-12
w-full
rounded-xl
border
border-slate-200
bg-white
px-4
text-sm
text-slate-600
"

>

<option>
All Status
</option>

</select>

</div>







{/* Sort */}

<div className="col-span-2">

<select

value={sort}

onChange={(e)=>
onSortChange(e.target.value)
}

className="
h-12
w-full
rounded-xl
border
border-slate-200
bg-white
px-4
text-sm
text-slate-600
"

>

<option>
Name (A-Z)
</option>

</select>


</div>








{/* Export */}

<div className="col-span-1">


<button

className="
flex
h-12
w-full
items-center
justify-center
gap-2
rounded-xl
border
border-slate-200
bg-white
text-sm
font-medium
text-slate-700
"

>

<Download size={19}/>

</button>


</div>







{/* Add */}

<div className="col-span-2">


<button

onClick={onAddVeterinarian}

className="
flex
h-12
w-full
items-center
justify-center
gap-2
rounded-xl
bg-blue-600
text-sm
font-semibold
text-white
hover:bg-blue-700
"

>

<Plus size={19}/>

<span>
Add Veterinarian
</span>


</button>


</div>



</div>

);

}


export default VeterinarianToolbar;