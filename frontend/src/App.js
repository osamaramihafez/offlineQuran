import "./App.css";
import { Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AudioList from "./components/AudioList";


function App() {
  return (
    <div className="App">
      <div className="App-contents">
        <Card>
          <Form>
            <Form.Group className="search">
              <Form.Control type="text" placeholder="Search" />
            </Form.Group>
          </Form>
          <AudioList></AudioList>
        </Card>
      </div>
    </div>
  );
}

export default App;

/**
 * Wireframe description:
 * - We have a simple search bar with the
 *   current episode under (all in the middle of the sreen)
 * 
 * - We have a list of all of the episode titles and
 *   numbers at the left of the page. (Save the episode title separately
 *   but point it to the corresponding mp3 file)
 */