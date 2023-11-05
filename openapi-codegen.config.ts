import {
    generateSchemaTypes,
    generateReactQueryComponents,
} from '@openapi-codegen/typescript';
import { defineConfig } from '@openapi-codegen/cli';
export default defineConfig({
    nomination: {
        from: {
            relativePath: './openapi.json',
            source: 'file',
        },
        outputDir: 'src/data',
        to: async (context) => {
            const filenamePrefix = 'nomination';
            const { schemasFiles } = await generateSchemaTypes(context, {
                filenamePrefix,
            });
            await generateReactQueryComponents(context, {
                filenamePrefix,
                schemasFiles,
            });
        },
    },
});
