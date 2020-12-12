export class ApiFeatures {
  constructor(public query, private queryString) {}

  filter(): this {
    // TODO: candidate for ramda implementation
    const queryObj = { ...this.queryString };
    const excludedFields: string[] = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // ADVANCED FILTERING
    // TODO: candidate for ramda implementation
    let queryStr: string = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      // TODO: candidate for ramda implementation
      const sortBy: string = this.queryString.sort
        .toString()
        .split(',')
        .join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      // TODO: candidate for ramda implementation
      const fields: string = this.queryString.fields
        .toString()
        .split(',')
        .join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate(): this {
    if (this.queryString.page) {
      // TODO: candidate for ramda implementation
      const page: number = +this.queryString.page || 1;
      const limit: number = +this.queryString.limit || 3;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }
}
