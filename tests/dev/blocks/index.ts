import { CatsSectionBlock } from './cats-section';
import { ContentBlock } from './content';
import { DogsSectionBlock } from './dogs-section';
import { PeopleSectionBlock } from './people-section';
import RecursiveContentBlock from './recursive-content';

const blocks = [CatsSectionBlock, DogsSectionBlock, PeopleSectionBlock, ContentBlock];

export default [...blocks, RecursiveContentBlock({ blocks })];
