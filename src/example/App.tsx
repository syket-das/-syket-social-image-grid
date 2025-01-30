import { ImageGrid } from "../components";
import "./App.css";

function App() {
  return (
    <>
      <ImageGrid
        aspectRatio="1"
        maxThumbnails={4}
        images={[
          "https://picsum.photos/600/500",
          "https://picsum.photos/600/500",
          "https://picsum.photos/600/500",
          "https://picsum.photos/600/500",
          "https://picsum.photos/600/500",
          "https://picsum.photos/600/500",
          "https://picsum.photos/600/500",
          "https://picsum.photos/600/500",
        ]}
      />
    </>
  );
}

export default App;

// unsplash api random: https://source.unsplash.com/random
