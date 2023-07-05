import ProfileDefault from '../../../Data/Default_pfp.svg';

import { StyledUserProfile } from './styled';

const { ImgWrapper, Image } = StyledUserProfile;

const DefaultCallback = () => {};

const UserProfile = ({ src, size, onError = DefaultCallback, onLoad = DefaultCallback }) => {
  const handleError = (e) => {
    e.target.src = ProfileDefault;
    onError();
  };

  const handleLoad = (e) => {
    if (e.target.src === src && e.target.complete) {
      onLoad();
    }
  };

  return (
    <ImgWrapper size={size}>
      <Image src={src} onError={handleError} onLoad={handleLoad} loading="lazy" size={size} />
    </ImgWrapper>
  );
};

export default UserProfile;
