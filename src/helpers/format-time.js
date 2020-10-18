export default function formatTime(date) {
    // console.log(date.split("T")[1].split(".")[0]);

    return date.split("T")[1].split(".")[0];
}

// formatTime("2020-10-14 08:41:08.048715");
// formatTime("2020-10-14T08:58:50.991Z");
