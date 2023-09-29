import { CatsSectionBlock } from './cats-section';
import { DogsSectionBlock } from './dogs-section';
import { PeopleSectionBlock } from './people-section';
import RecursiveContentBlock from './recursive-content';

const blocks = [CatsSectionBlock, DogsSectionBlock, PeopleSectionBlock];

export default [...blocks, RecursiveContentBlock({ blocks })];
