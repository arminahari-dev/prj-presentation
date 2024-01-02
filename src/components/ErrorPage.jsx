import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    // console.error(error);

    return (
        <div id="error-page" class="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 class="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
            <p class="text-lg text-gray-800 mb-4">Sorry, an unexpected error has occurred.</p>
            <p class="text-gray-600 italic">{error.statusText || error.message}</p>
        </div>
    );
}