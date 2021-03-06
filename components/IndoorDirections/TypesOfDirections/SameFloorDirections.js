import React from "react";
import { Line, G } from "react-native-svg";
import { ClassGraph } from "../../../constants/ClassGraph";
import { Class9Graph } from "../../../constants/ClassGraph9";
import { dijkstra, getFloorNumber, ConvertToHall8Floor, getArrowCoordinates, shortestPathToInterest } from "../Dijkstra/DijkstraAlgorithm";
import { Hall9Coordinates } from "../../../constants/Hall9Coordinates";
import { LoyolaGraph } from "../../../constants/LoyolaGraph";

/**
 * Implementation of algorithm to get directions on the same floor
 * @param {} props 
 */
export function SameFloorDirections (props) {
    const floor = props.from == "exit" ? 1 : getFloorNumber(props.from);
    const rooms = floor == 9 ? Hall9Coordinates() : props.rooms;
    var graph = floor == 9 ? Class9Graph() : ClassGraph();
    var from = floor == 9 ? props.from : ConvertToHall8Floor(props.from);
    var to = "";
    var route = null;

    if (props.interest == true) {
        var interest = shortestPathToInterest(graph, from, props.to);
        to = interest.to;
        route = interest.route;
    } else {
        to = floor == 9 ? props.to : ConvertToHall8Floor(props.to);
        route = dijkstra(graph, from, to).path;
    }

    if (props.loy) {
        graph = LoyolaGraph();
        from = props.from;
        to = props.to;
        route = dijkstra(graph, from, to).path;
    }

    var getNextRoom = (index) => {
        if (index < route.length) {
            return route[++index];
        }
    };

    const lines = [];
    route.forEach((element, index) => {
        if (index < route.length - 1) {
            lines.push({ id: index, x1: rooms[element].nearestPoint.x, y1: rooms[element].nearestPoint.y, x2: rooms[getNextRoom(index)].nearestPoint.x, y2: rooms[getNextRoom(index)].nearestPoint.y });
        }
    });

    const arrow = getArrowCoordinates(rooms[to].nearestPoint.x, rooms[to].nearestPoint.y, rooms[to].x, rooms[to].y);
    if(props.floor == floor) {
        return(
            <G testID="SameFloorDirections_GraphDirections">
                <Line x1={rooms[from].x} y1={rooms[from].y} x2={rooms[from].nearestPoint.x} y2={rooms[from].nearestPoint.y} stroke="blue" strokeWidth="5"/>
                {
                    lines.map(el => <Line key={el.id} x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} stroke="blue" strokeWidth="5" />)
                }
                <Line x1={rooms[to].x} y1={rooms[to].y} x2={rooms[to].nearestPoint.x} y2={rooms[to].nearestPoint.y} stroke="blue" strokeWidth="5" />
                <Line x1={arrow.x3} y1={arrow.y3} x2={rooms[to].x} y2={rooms[to].y} stroke="blue" strokeWidth="5" />
                <Line x1={arrow.x4} y1={arrow.y4} x2={rooms[to].x} y2={rooms[to].y} stroke="blue" strokeWidth="5" />
            </G>
        );
    }
    return (<G></G>);
}
