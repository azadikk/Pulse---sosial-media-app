import '../styles/container.scss'
import { useSidebarContext } from '../contexts/SidebarContext'
import MainContainer from './ContainerUitils/MainContainer';
import { UseSharePostModal } from '../contexts/SharePostModal';
import { ifModalOpened } from '../uimodals/GlobalStyleIfModalOpened';

const Container = () => {
  const { sidebaropen } = useSidebarContext();
  const { sharePostModal } = UseSharePostModal();

  return (
    <div className='container' style={{...(sharePostModal ? ifModalOpened : {}), width: sidebaropen ? '85%' : ''}}>
     <MainContainer />
    </div>
  )
}

export default Container