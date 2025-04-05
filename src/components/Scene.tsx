import { useSelector} from "react-redux";
import { RolePublicData } from "@/types/storyTypes";

const Scene = () => { 
    // const selectedStory = useSelector((state: any) => state.firebase.selectedStory);
    const publicData = useSelector((state: any) => state.firebase.publicData);
    console.log(publicData)

    return (
        <div>
            <h2>Scene</h2>
            <p className="px-5">{publicData?.scene}</p>
            <p>------------------</p>
            <h2>Player Descriptions</h2>
            {publicData?.roles.map((role: RolePublicData)=>{
                return (
                    <div>
                        <p>{role.name} the {role.role}</p>
                        <p>{role.description}</p>
                        <p>------------------</p>
                    </div>
                )
            })}
        </div>
    );
}

export default Scene;