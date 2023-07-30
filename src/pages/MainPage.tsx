import styled from 'styled-components';
import { Header } from '../components/Header/Header.tsx';
import { OkvedList } from '../components/OkvedList/OkvedList.tsx';

function MainPage() {
  return (
    <Layout>
      <Header />
      <OkvedList />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  padding: 24px 0;
`;

export default MainPage;
