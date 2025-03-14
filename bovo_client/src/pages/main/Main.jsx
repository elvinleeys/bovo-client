import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Container, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const Main = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [bookStyles, setBookStyles] = useState({});

    useEffect(() => {
        const accessToken = sessionStorage.getItem("AccessToken");

        if (!accessToken) {
            console.error("AccessToken 없음, 로그인 페이지로 이동");
            navigate("/login");  
            return;
        }

        axios.get(`${API_URL}/main`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`, 
                "ngrok-skip-browser-warning": "69420"
            },
            withCredentials: true
        })
        .then((response) => {
            console.log("서버 응답:", response.data);
            setUserData(response.data);

            setBookStyles((prevStyles) => {
                const storedStyles = JSON.parse(sessionStorage.getItem("bookStyles")) || {};
                const updatedStyles = { ...storedStyles };
    
                const newBooks = response.data.book_list ? Object.values(response.data.book_list) : [];
    
                newBooks.forEach((book) => {
                    if (!updatedStyles[book]) {
                        updatedStyles[book] = {
                            width: `${Math.floor(Math.random() * 2) + 4}rem`,
                            height: `${Math.floor(Math.random() * 3) + 12}rem`,
                            backgroundColor: ["#D5ECF2", "#F3E38B", "#BDE5F1", "#97D9FB"][
                                Math.floor(Math.random() * 4)
                            ],
                        };
                    }
                });
    
                sessionStorage.setItem("bookStyles", JSON.stringify(updatedStyles));
                return updatedStyles;
            });
        })
        .catch((error) => {
            console.error("데이터 오류:", error);

            if (error.response && error.response.status === 401) {
                console.log("AccessToken 만료 또는 인증 실패, 로그인 필요");
                sessionStorage.removeItem("AccessToken"); 
                navigate("/login");
            }
        });
    }, [navigate]);

    const {
        nickname,
        profile_picture,
        level,
        total_book_num,
        recent_book_info = {},
        book_list = {}
    } = userData || {};

    const {
        bookName,
        bookAuthor,
        bookCover,
        readingStartDate,
        bookScore=0, 
    } = recent_book_info || {};

    const bookArray = book_list ? Object.values(book_list) : [];

    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "5rem" }}>
            <>
                <Box
                    sx={{
                        backgroundColor: "#E8F0F8",
                        borderRadius: "2rem",
                        padding: "2.5rem",
                        width: "37rem",
                        height: "45rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    <Box sx={{ width: "100%", paddingTop: "3rem" }}>
                        <Typography sx={{ fontSize: "1.9rem", color: "#000000", marginLeft: "2rem" }}>
                            Lv. {level}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "0.2rem", marginLeft: "2rem" }}>
                            <Typography sx={{ fontSize: "3.5rem", fontWeight: "800" }}>{nickname}</Typography>
                            <Typography sx={{ fontSize: "2.4rem", fontWeight: "500", marginTop: "0.7rem", marginLeft: "1rem" }}>
                                님
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingTop: "1.5rem" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "2rem" }}>
                            <Typography sx={{ fontSize: "5rem", fontWeight: "800", color: "#739CD4", marginLeft: "2rem" }}>
                                {total_book_num}
                            </Typography>
                            <Typography sx={{ fontSize: "2rem", color: "#000000", marginLeft: "2rem", marginBottom: "-7rem" }}>
                                권째 기록 중
                            </Typography>
                        </Box>
                        <img src={profile_picture} alt="Profile" style={{ width: "12rem", height: "12rem", marginBottom: "-2rem" }} />
                    </Box>

                    {recent_book_info === null ? (
                        <Box
                            className="no-book-info"
                            onClick={() => navigate("/search")}
                            sx={{
                                backgroundColor: "#ffffff",
                                padding: "2rem",
                                borderRadius: "1.5rem",
                                width: "35rem",
                                height: "20rem",
                                marginTop: "2rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography sx={{ fontSize: "2.6rem", fontWeight: "500", color: "#7B7B7B" }}>
                                새로운 책 추가하러 가기
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            className="recent-book-info"
                            onClick={() => navigate("/archive")}
                            sx={{
                                backgroundColor: "#ffffff",
                                padding: "2rem",
                                borderRadius: "1.5rem",
                                width: "35rem",
                                height: "20rem",
                                marginTop: "2rem",
                            }}
                        >
                            <Box sx={{ display: "flex", gap: 5 }}>
                                <Box
                                    sx={{
                                        width: "12rem",
                                        height: "16rem",
                                        backgroundColor: "#D9D9D9",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1.2rem",
                                        color: "#555",
                                        marginTop: "0.5rem",
                                        marginLeft: "0.8rem",
                                    }}
                                >
                                    <img src={bookCover} 
                                        alt="책 표지" 
                                        style={{ width: "100%", height: "100%" }} />
                                </Box>

                                <Box>
                                <Typography 
                                    sx={{ 
                                            fontSize: "2.6rem", 
                                            fontWeight: "700", 
                                            marginTop: "1rem",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 1, 
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}
                                    >
                                        {bookName}
                                    </Typography>

                                    <Typography 
                                        sx={{ 
                                            fontSize: "1.6rem", 
                                            color: "#6D6D6D", 
                                            marginTop: "1rem",
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 1,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}
                                    >
                                        {bookAuthor}
                                    </Typography>
                                    <Typography sx={{ fontSize: "1.6rem", color: "#6D6D6D", marginTop: "0.5rem" }}>
                                        읽기 시작한 날: {readingStartDate ? new Date(readingStartDate).toLocaleDateString() : "날짜 없음"}
                                    </Typography>
                                    <Box sx={{ marginTop: "1.7rem", display: "flex", alignItems: "center" }}>
                                    <Rating value={bookScore}readOnly precision={0.1} sx={{fontSize:"3rem"}} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>

                <Box sx={{ marginTop: "8rem", width: "100%" }}>
                <Box sx={{ display: "flex", gap: 2.7, justifyContent: "center", alignItems: "flex-end", height: "12rem" }}>
                    {bookArray.map((book, index) => {
                            const { width, height, backgroundColor } = bookStyles[book] || {
                                width: "4rem",
                                height: "12rem",
                                backgroundColor: "#D5ECF2",
                            };

                            return (
                                <Box key={index} sx={{ width, height, backgroundColor, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.4rem" }}>
                                    <Typography variant="caption" sx={{ transform: "rotate(-270deg)", whiteSpace: "nowrap", fontSize: "1.4rem" }}>
                                        {book}
                                    </Typography>
                                </Box>
                            );
                        })}
                </Box>
                <Box sx={{ backgroundColor: "#739CD4", height: "1.5rem", borderRadius: "1rem", width: "100%" }}></Box>
            </Box> 
            </>
        </Container>
    );
};

export default Main;
