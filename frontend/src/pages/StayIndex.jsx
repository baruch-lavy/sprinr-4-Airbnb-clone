import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStays } from "../store/actions/stay.actions";
import { Loading } from "../cmps/Loading";
import { StayList } from "../cmps/StayList";


export function StayIndex() {
    const stays = useSelector((storeState) => storeState.stayModule.stays);
    useEffect(() => {
        loadStays();
    }, []);

    if (!stays) return <Loading />;
    return <StayList stays={stays} />
}

