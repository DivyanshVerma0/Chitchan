import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./chakra/theme";
import Layout from "./components/Layout";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/theme.css";


function App() {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              {/* Your routes here */}
            </Routes>
          </Layout>
        </Router>
      </ChakraProvider>
    </RecoilRoot>
  );
}


export default App; 
