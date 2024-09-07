import { useRef, useState } from "react";

export const Form = () => {
    const searchWord = useRef(null);
    const pageName = useRef(null);
    const getNum = useRef(null);

    const [videoData, setVideoData] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        // API呼び出す処理かく
        fetch(`http://localhost:1323/fetcher?searchWord=${encodeURIComponent(searchWord.current?.value)}&getNum=${getNum.current?.value}&pageName=${pageName.current?.value}`)
            .then(response => response.json())
            .then(data => {

                setVideoData(data);

            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('results').innerHTML = 'エラーが発生しました。';
            });
    }


    return (
        <>
            <div className="container mx-auto">
                <h1>動画取得ツール</h1>
                <form id="searchForm" className=" w-full max-w-2xl px-3" onSubmit={handleSubmit}>
                    <div className="flex space-x-1">
                        <input className="block w-full sm:w-2/3 bg-gray-200 py-2 px-3 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white" type="text" ref={searchWord} placeholder="検索ワード" required></input>
                        <select className="block w-full sm:w-2/3 bg-gray-200 py-2 px-3 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white" ref={pageName}>
                            <option value="ALL">すべて</option>
                            <option value="tokyomotion">tokyomotion</option>
                            <option value="tktube">tktube</option>
                        </select>
                        <input className="block w-full sm:w-2/3 bg-gray-200 py-2 px-3 text-gray-700 border border-gray-200 rounded focus:outline-none focus:bg-white" type="number" ref={getNum} placeholder="取得数" max="10"></input>

                        <button className="w-24 bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300" type="submit">検索</button>
                    </div>
                </form>

                <div id="results" className="grid grid-cols-4 m-1">

                </div>
            </div>

            <div className="grid grid-cols-4 m-1">
                {videoData && Object.entries(videoData).map(([siteName, videos]) => (
                    <div key={siteName} className="m-5">
                        <div className="sticky top-0">
                        <img src={videoData[siteName][0].Logo} alt="Logo" className="w-50 h-16"/>
                        </div>

                        {Array.isArray(videos) ? (
                            videos.map((video, index) => (
                                <a href={video.Url} target="_blank" rel="noopener noreferrer">
                                    <div key={index} className="shadow-md bg-white m-2">
                                        <img src={video.Image} alt={video.Name} />
                                        <p>{video.Name}</p>
                                        <p>投稿日: {video.PostedAt}</p>
                                    </div>
                                </a>
                            ))
                        ) : (
                            <p>No videos available for this site.</p>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}
