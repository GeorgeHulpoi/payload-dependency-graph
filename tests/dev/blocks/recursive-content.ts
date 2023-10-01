import { Block, Field } from 'payload/types';
import { DiscoverMeBlock } from './discover-me';

type RecursiveContentBlockType = (options?: { depth?: number; blocks?: Block[] }) => Block;

const block: RecursiveContentBlockType = ({ depth = 0, blocks = [] } = {}) => {
	const contentField: Field = {
		name: 'content',
		type: 'blocks',
		blocks: [...blocks, DiscoverMeBlock],
	};

	let o: Block = {
		slug: 'recursive-content',
		interfaceName: 'RecursiveContentBlock',
		fields: [contentField],
	};

	if (depth < 3) {
		contentField.blocks.push(block({ depth: depth + 1, blocks }));
	}

	return o;
};

export default block;
