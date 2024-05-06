import axios from "axios";
import { v4 } from "uuid";

export const WsURL = 'wss://game-socket.azurewebsites.net/join';

/**
 * 
 * const uuid = Math.random().toString(36).substring(2);

        function createRoom() {
            $.ajax({
                url: "/create",
                type: "GET",
                success: function (response) {
                    $("#createResult").text("Room created successfully. Room ID: " + response);
                },
                error: function (xhr, status, error) {
                    $("#createResult").text("Error creating room: " + error);
                }
            });
        }
 */

export const uuid = v4();

export async function createRoom() {
    try {
        const response = await axios.get('/create');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
} 