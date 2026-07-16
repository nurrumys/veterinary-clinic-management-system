import type { LucideIcon } from "lucide-react";

import Card from "../ui/Card";


type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle: string;

  icon: LucideIcon;

  iconColor: string;
  iconBackground: string;
};


function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  iconBackground,
}: StatsCardProps) {


  return (

    <Card>

      <div
        className="
          flex
          min-h-[150px]
          flex-col
          justify-between
        "
      >


        {/* Top section */}

        <div
          className="
            flex
            items-start
            justify-between
          "
        >


          <div
            className="
              max-w-[130px]
            "
          >

            <p
              className="
                text-sm
                font-medium
                leading-5
                text-slate-500
              "
            >
              {title}
            </p>



            <h3
              className="
                mt-3
                text-3xl
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              {value}
            </h3>


          </div>





          {/* Icon */}

          <div
            className={`
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              ${iconBackground}
            `}
          >

            <Icon
              size={24}
              className={iconColor}
            />

          </div>


        </div>





        {/* Bottom text */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <span
            className="
              text-sm
              text-emerald-600
            "
          >
            ↗
          </span>



          <p
            className="
              text-sm
              font-medium
              leading-5
              text-emerald-600
            "
          >
            {subtitle}
          </p>


        </div>


      </div>


    </Card>

  );

}


export default StatsCard;