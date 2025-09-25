import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';

export class Random implements INodeType {

	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:random.svg',
		group: ['transform'],
		version: 1,
		description: 'True Random Number Generator using random.org',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'True Random Number Generator',
						value: 'trueRandom',
						description: 'Generate a true random integer using Random.org',
					},
				],
				default: 'trueRandom',
				description: 'Choose the operation',
			},
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				description: 'Minimum integer (inclusive). Accepts only integer values.',
				required: true,
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 60,
				description: 'Maximum integer (inclusive). Accepts only integer values.',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;
			if (operation === 'trueRandom') {
				const min = this.getNodeParameter('min', i) as number;
				const max = this.getNodeParameter('max', i) as number;

				if (!Number.isInteger(min) || !Number.isInteger(max)) {
					throw new Error('Min and Max must be integers.');
				}
				if (min > max) {
					throw new Error('Min must be less than or equal to Max.');
				}

				const options: IHttpRequestOptions = {
					url: 'https://www.random.org/integers/',
						qs: {
						num: 1,
						min,
						max,
						col: 1,
						base: 10,
						format: 'plain',
						rnd: 'new',
					},
					method: 'GET',
					json: false,
				};

				const response = (await this.helpers.httpRequest(options)) as string;

				const parsed = parseInt(response.trim(), 10);
				if (Number.isNaN(parsed)) {
					throw new Error(`random.org returned unexpected response: ${response}`);
				}

				returnData.push({ random: parsed });
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
