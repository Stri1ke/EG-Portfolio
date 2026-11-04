import type { DemoArtworkData } from "../../../lib/model";
/** Старые демо-обложки собраны из обычных элементов и CSS; это не загруженные изображения. */
export function DemoArtwork({ project }: { project: DemoArtworkData }) {
  return (
    <div className={"art " + project.kind}>
      <span className="tag">{project.label}</span>
      {project.kind === "graphic" ? (
        <div className="poster">
          PLAY<span>YOUR</span>WAY.
        </div>
      ) : (
        <div className="mock-screen">
          <div className="mock-head">
            <span>
              {project.kind === "casual" ? "BLOOM GARDEN" : "PLAYER / 001"}
            </span>
            <span>◈ 2 450</span>
          </div>
          <div className="mock-title">{project.title}</div>
          {project.kind === "racing" ? (
            <div className="race-lines" />
          ) : (
            <div className="inventory">
              {project.glyphs.map((glyph, index) => (
                <div className="item" key={index}>
                  {glyph}
                </div>
              ))}
            </div>
          )}
          {project.kind === "fantasy" && <div className="weapon" />}
          {project.kind === "space" && <div className="radar" />}
          <div className="mock-foot">
            <span />
            <span />
          </div>
        </div>
      )}
      <span className="art-label">CONCEPT PLACEHOLDER / {project.number}</span>
    </div>
  );
}
