module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        symbol: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Stock = mongoose.model("stock", schema);
    return Stock;
  };

  