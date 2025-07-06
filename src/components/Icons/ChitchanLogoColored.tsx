import React from 'react';
import { Image, ImageProps } from '@chakra-ui/react';

export const ChitchanLogoColored: React.FC<ImageProps> = (props) => (
  <Image src="/images/chitchan.png" alt="Chitchan Logo" {...props} />
);

export default ChitchanLogoColored; 