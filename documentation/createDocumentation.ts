import writeDocumentation from "./writeDocumentation.ts";
import docObjects from "./documentationObjects.ts";

await Promise.all(docObjects.map((docObject) => writeDocumentation(docObject)));
