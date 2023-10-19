// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
	docs: ['introduction', 'getting-started'],
	api: [
		{
			type: 'doc',
			label: 'Overview',
			id: 'api/overview',
		},
		{
			type: 'category',
			label: 'Classes',
			collapsed: false,
			items: [
				{
					type: 'doc',
					label: 'DependencyGraphBase',
					id: 'api/classes/DependencyGraphBase',
				},
				{
					type: 'doc',
					label: 'InMemoryDependencyGraph',
					id: 'api/classes/InMemoryDependencyGraph',
				},
				{
					type: 'doc',
					label: 'DependencyGraphServiceImpl',
					id: 'api/classes/DependencyGraphServiceImpl',
				},
				{
					type: 'doc',
					label: 'Subject',
					id: 'api/classes/Subject',
				},
				{
					type: 'doc',
					label: 'Subscription',
					id: 'api/classes/Subscription',
				},
			],
		},
		{
			type: 'category',
			label: 'Interfaces',
			collapsed: false,
			items: [
				{
					type: 'doc',
					label: 'BaseEvent',
					id: 'api/interfaces/BaseEvent',
				},
				{
					type: 'doc',
					label: 'CreateEvent',
					id: 'api/interfaces/CreateEvent',
				},
				{
					type: 'doc',
					label: 'DeleteEvent',
					id: 'api/interfaces/DeleteEvent',
				},
				{
					type: 'doc',
					label: 'UpdateEvent',
					id: 'api/interfaces/UpdateEvent',
				},
				{
					type: 'doc',
					label: 'DependencyGraphCollectionResource',
					id: 'api/interfaces/DependencyGraphCollectionResource',
				},
				{
					type: 'doc',
					label: 'DependencyGraphCollections',
					id: 'api/interfaces/DependencyGraphCollections',
				},
				{
					type: 'doc',
					label: 'DependencyGraphGlobalResource',
					id: 'api/interfaces/DependencyGraphGlobalResource',
				},
				{
					type: 'doc',
					label: 'DependencyGraphGlobals',
					id: 'api/interfaces/DependencyGraphGlobals',
				},
				{
					type: 'doc',
					label: 'DependencyGraphNode',
					id: 'api/interfaces/DependencyGraphNode',
				},
				{
					type: 'doc',
					label: 'DependencyGraphPluginConfig',
					id: 'api/interfaces/DependencyGraphPluginConfig',
				},
				{
					type: 'doc',
					label: 'DependencySchema',
					id: 'api/interfaces/DependencySchema',
				},
				{
					type: 'doc',
					label: 'DependencySchemaSlug',
					id: 'api/interfaces/DependencySchemaSlug',
				},
				{
					type: 'doc',
					label: 'OnCollectionChangeArgs',
					id: 'api/interfaces/OnCollectionChangeArgs',
				},
				{
					type: 'doc',
					label: 'OnCollectionDeleteArgs',
					id: 'api/interfaces/OnCollectionDeleteArgs',
				},
				{
					type: 'doc',
					label: 'OnGlobalChangeArgs',
					id: 'api/interfaces/OnGlobalChangeArgs',
				},
			],
		},
	],
};

module.exports = sidebars;
