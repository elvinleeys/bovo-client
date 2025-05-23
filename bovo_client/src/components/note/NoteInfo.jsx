/** 책 상세보기에서 상단의 책 정보를 나타내는 부분 */

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import NoteBottomSheet from "../noteBottomSheet/NoteBottomSheet";
import { bookPropType } from "../../utils/propTypes";

// 책 상태 라벨
const statusLabels = {
  ing: "읽는 중",
  end: "다 읽음",
  wish: "읽고 싶음"
};

const NoteInfo = ({ book }) => {
  const [openSheet, setOpenSheet] = useState(false);

  const handleOpenSheet = () => setOpenSheet(true);
  const handleCloseSheet = () => setOpenSheet(false);

  // 데이터가 없을 때 로딩 표시
  if (!book) {
    return (
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "20rem" 
        }}
      >
        데이터를 불러오는 중...
      </Box>
    );
  }

  return (
    <>
      <Box 
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          position: "relative",
          marginTop: "3rem",
          marginBottom: "3rem",
          marginLeft: "2rem"
        }}
      >
        {/* 책 표지 */}
        <Box 
          component="img"
          src={book.cover || "/placeholder-book.jpg"} // 기본 이미지 설정
          alt={book.title || "책 표지"}
          sx={{
            width: "15rem",
            height: "22.5rem",
            objectFit: "cover",
            backgroundColor: "lightgray"
          }}
        />

        {/* 책 정보 영역 */}
        <Box 
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            flex: 1,
            paddingLeft: "4rem",
            position: "relative"
          }}
        >
          {/* 상태 표시 & 수정 버튼 */}
          <Box 
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              width: "100%"
            }}
          >
            {/* 책 상태 표시 */}
            <Chip
              label={statusLabels[book.status || "ing"]}
              sx={{
                fontSize: "1.2rem",
                borderRadius: "2.5rem",
                width: "9rem",
                height: "3rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#E8F1F6",
                "& .MuiChip-label": { padding: 0 }
              }}
            />
            {/* 정보 수정 버튼 */}
            <IconButton
              onClick={handleOpenSheet}
              sx={{
                position: "absolute",
                right: "2.5rem",
                color: "#739CD4"
              }}
            >
              <EditIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Box>

          {/* 책 제목 */}
          <Box 
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              width: "20rem",
              height: "5rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "2.5rem",
              margin: "0rem"
            }}
          >
            {book.title || "제목 없음"}
          </Box>

          {/* 저자 정보 */}
          <Box 
            sx={{
              fontSize: "1.5rem",
              width: "20rem",
              height: "3rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "1.5rem",
              margin: "0"
            }}
          >
            {book.author || "작가 미상"}
          </Box>

          {/* 별점 표시 */}
          <Rating 
            value={(book.star || 0) / 2} 
            precision={0.5}
            readOnly 
            sx={{ fontSize: "2rem" }}
          />

          {/* 독서 기간 */}
          <Box 
            sx={{
              fontSize: "1.5rem",
              width: "20rem",
              height: "3rem",
              margin: "0rem"
            }}
          >
            {book.start_date || "-"} - {book.end_date || "-"}
          </Box>
        </Box>
      </Box>

      {/* 책 정보 수정 바텀 시트 */}
      <NoteBottomSheet 
        open={openSheet} 
        onClose={handleCloseSheet} 
        book={book} 
      />
    </>
  );
};

// PropTypes 정의
NoteInfo.propTypes = {
  book: bookPropType,
};

export default NoteInfo;