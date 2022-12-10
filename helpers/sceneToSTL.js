import GLTFExporter from "three-gltf-exporter";

export const exportSceneToSTL = (scene, username) => {
  const exporter = new GLTFExporter();

  exporter.parse(scene, (result) => {
    if (result instanceof ArrayBuffer) {
      saveArrayBuffer(result, `${username}-report.glb`);
    } else {
      const output = JSON.stringify(result, null, 2);
      saveString(output, `${username}-report.gltf`);
    }
  });
};

function save(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function saveString(text, filename) {
  save(new Blob([text], { type: "text/plain" }), filename);
}

function saveArrayBuffer(buffer, filename) {
  save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}
