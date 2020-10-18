export default function capitalize(input) {
    return input
        ? input.indexOf("-") == -1 && input.indexOf(" ") == -1
            ? input[0].toUpperCase() + input.slice(1).toLowerCase()
            : input.indexOf("-") != -1
            ? input
                  .split("-")
                  .map((word) => {
                      return (
                          word[0].toUpperCase() + word.slice(1).toLowerCase()
                      );
                  })
                  .join("-")
            : input
                  .split(" ")
                  .map((word) => {
                      return (
                          word[0].toUpperCase() + word.slice(1).toLowerCase()
                      );
                  })
                  .join(" ")
        : "";
}
