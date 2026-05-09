const loadCauseList = async () => {
    const res = await axios.post("/api/cause-list", {
        url: "https://example-court.gov.in",
    });

    setList(res.data);
};