function debugShape(body, stage){
    var vertices = body.shapes[0].vertices;
    var pixiVertices = vertices.map(v => {
        return new Point(v[0], v[1]);
    })
    var debugShape = new Graphics()
        .lineStyle(1, 0x00ff00)
        .beginFill(0xff0000, 0.5)
        .drawPolygon(pixiVertices);
    stage.addChild(debugShape);
}

module.exports = {
    debugShape
}

