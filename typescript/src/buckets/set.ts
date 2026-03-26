import {
    setBucketNotifications
    /*, setBucketCors */
} from "@tigrisdata/storage";

const { data, error } = await setBucketNotifications("llm-base", {
    override: true,
    notificationConfig: {
        url: 'https://tigrisdata.com/api',
    },
});

/*const { data, error } = await setBucketCors("llm-base", {
    override: false,
    rules: [{
        allowedOrigins: ["*",],
        allowedMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization"],
        exposeHeaders: ["Content-Type"],
        maxAge: 3600,
    },
    ],
});*/

if (error) {
    console.error("error setting bucket", error);
} else {
    console.log("bucket set", data);
}