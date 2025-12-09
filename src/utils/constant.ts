const imageValidationExtensions = [
	"png",
	"jpg",
	"jpeg",
	"gif",
	"svg",
	"heic",
	"heif",
	"webp",
];
const mimeTypes: any = {
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	gif: "image/gif",
	svg: "image/svg+xml",
	heic: "image/heic",
	heif: "image/heif",
	webp: "image/webp",
};
const status = ["Pending", "Accepted", "Rejected"];
export {
	imageValidationExtensions,
	mimeTypes,
	status,
};
