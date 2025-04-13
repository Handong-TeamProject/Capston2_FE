import {dayDescription} from "@/data/dayDescription";
import Introduce from "../layout/Introduce";

function ActivityDesc({day, activity} : {day:number, activity:number}) {
    return (
        <div className="mt-16 flex w-full flex-col justify-between md:flex-row">
            <Introduce
                title={dayDescription[day]
                    .activity[activity]
                    .title}
                desc={dayDescription[day]
                    .activity[activity]
                    .desc}/>
        </div>
    )
}
export default ActivityDesc;