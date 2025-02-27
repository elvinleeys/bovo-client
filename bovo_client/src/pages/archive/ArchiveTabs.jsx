import { Tabs, Tab, Box, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ArchiveTabs = ({ currentTab, setCurrentTab, searchQuery, setSearchQuery, bookCount }) => {
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
    setSearchQuery("");
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-flexContainer": { justifyContent: "center" },
          "& .MuiTabs-indicator": { backgroundColor: "#739CD4", height: "0.25rem" },
        }}
      >
        {[
          { label: "읽는 중", value: "ing" },
          { label: "다 읽음", value: "end" },
          { label: "읽고 싶음", value: "wish" },
        ].map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: currentTab === tab.value ? "#739CD4" : "black",
              minWidth: "14rem",
              minHeight: "4rem",
            }}
          />
        ))}
      </Tabs>

      {/* 검색창 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "43rem",
          height: "4rem",
          backgroundColor: "#E8F1F6",
          borderRadius: "1.5625rem",
          marginTop: "2rem",
        }}
      >
      <SearchIcon 
        sx={{ 
          color: "#739CD4", 
          fontSize: "3rem", 
          marginRight: "1rem",
          marginLeft: "1rem"
        }} 
      />
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="책 제목을 검색하세요"
          variant="standard"
          sx={{
            width: "85%",
            fontSize: "1.5rem",
            "& input": {
              fontSize: "1.5rem",
            },
          }}
        />
      </Box>

      {/* 총 권수*/}
      {searchQuery === "" && (
      <Typography
        sx={{
          marginTop: "1rem",
          marginLeft: "2rem",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "black",
          textAlign: "left",
          width: "43rem",
        }}
      >
        총 {bookCount}권
      </Typography>
      )}
    </Box>
  );
};

export default ArchiveTabs;