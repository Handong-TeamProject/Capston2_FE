import {dayDescription} from "@/data/dayDescription";
import Introduce from "../layout/Introduce";

function ActivityDesc({day, activity, project_id} : {day:number, activity:number, project_id:number}) {
    return (
        <div className="mt-16 mb-6 lg:mb-16  flex w-full flex-col justify-between md:flex-row">
            <Introduce
                title={dayDescription[day]
                    .activity[activity]
                    .title}
                desc={dayDescription[day]
                    .activity[activity]
                    .desc}
                project_id={project_id}
            />
                    
        </div>
    )
}
export default ActivityDesc;