type TextPayload   = { kind: 'text';  content: string }
type ImagePayload  = { kind: 'image'; url: string; width: number; height: number }
type VideoPayload  = { kind: 'video'; url: string; duration: number }

type Payload = TextPayload | ImagePayload | VideoPayload


function describePayload(payload: Payload): string {
    switch (payload.kind) {
        case "text":
            return `文本:${payload.content}`;
        case "image":
            return `图片:${payload.width}X${payload.height}`
        case "video":
            return `视频:${payload.duration}秒`
        default:{
            const exhaustiveCheck: never = payload;
            return exhaustiveCheck;
        }

    }

}