import { useState, useEffect } from "react";
import axios from "axios";
import { APIResponse } from "@/shared/types";

type ErrorType = { cod: number; message: string } | null;

export const useWeather = () => {
    const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
    const [city, setCity] = useState<string>("");

    const [error, setError] = useState<ErrorType>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<APIResponse>();
    const [history, setHistory] = useState<APIResponse[]>([]);
    const [showEmptyState, setShowEmptyState] = useState<boolean>();

    const onSubmit = async (city: string) => {
        try {
            const cityData = history.find(
                (histItem) => {
                    return histItem.name.toLowerCase() === city
                }
            );
            if (cityData) {
                setData(cityData);
                return
            }

            setShowEmptyState(false);
            setError(null);
            setLoading(true);
            const { data } = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

            localStorage.setItem("lastSaved", JSON.stringify({ city, data }));
            setData(data);
            setHistory((prevState) => {
                const maxLength = 4;
                const updatedHistory = prevState.filter(item => item.name !== data.name);
                const newHistory = updatedHistory.slice(updatedHistory.length > maxLength ? updatedHistory.length - maxLength : 0);
                return [data, ...newHistory];
            });
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setError(e.response?.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const init = () => {
        const lastSaved = localStorage.getItem("lastSaved") as string;
        if (!lastSaved) {
            setShowEmptyState(true);
            return;
        }

        let parsed: { data: APIResponse; city: string } | object = {};
        try {
            parsed = JSON.parse(lastSaved || "{}");
            if ("city" in parsed) {
                setData(parsed.data);
                setCity(parsed.city);
            }
        } catch (e) {
            console.log(e);
        }

    };

    useEffect(() => {
        init();
    }, []);

    return {
        error,
        loading,
        data,
        onSubmit,
        city,
        setCity,
        showEmptyState,
        history,
        setData
    }
}