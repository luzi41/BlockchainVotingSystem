
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model audit_logs
 * 
 */
export type audit_logs = $Result.DefaultSelection<Prisma.$audit_logsPayload>
/**
 * Model candidates
 * 
 */
export type candidates = $Result.DefaultSelection<Prisma.$candidatesPayload>
/**
 * Model districts
 * 
 */
export type districts = $Result.DefaultSelection<Prisma.$districtsPayload>
/**
 * Model elections
 * 
 */
export type elections = $Result.DefaultSelection<Prisma.$electionsPayload>
/**
 * Model parties
 * 
 */
export type parties = $Result.DefaultSelection<Prisma.$partiesPayload>
/**
 * Model voters
 * 
 */
export type voters = $Result.DefaultSelection<Prisma.$votersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const users_role: {
  SUPERADMIN: 'SUPERADMIN',
  WAHLLEITER: 'WAHLLEITER',
  MITARBEITER: 'MITARBEITER'
};

export type users_role = (typeof users_role)[keyof typeof users_role]


export const elections_status: {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED'
};

export type elections_status = (typeof elections_status)[keyof typeof elections_status]

}

export type users_role = $Enums.users_role

export const users_role: typeof $Enums.users_role

export type elections_status = $Enums.elections_status

export const elections_status: typeof $Enums.elections_status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.audit_logs`: Exposes CRUD operations for the **audit_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Audit_logs
    * const audit_logs = await prisma.audit_logs.findMany()
    * ```
    */
  get audit_logs(): Prisma.audit_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.candidates`: Exposes CRUD operations for the **candidates** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Candidates
    * const candidates = await prisma.candidates.findMany()
    * ```
    */
  get candidates(): Prisma.candidatesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.districts`: Exposes CRUD operations for the **districts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Districts
    * const districts = await prisma.districts.findMany()
    * ```
    */
  get districts(): Prisma.districtsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.elections`: Exposes CRUD operations for the **elections** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Elections
    * const elections = await prisma.elections.findMany()
    * ```
    */
  get elections(): Prisma.electionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parties`: Exposes CRUD operations for the **parties** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parties
    * const parties = await prisma.parties.findMany()
    * ```
    */
  get parties(): Prisma.partiesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.voters`: Exposes CRUD operations for the **voters** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Voters
    * const voters = await prisma.voters.findMany()
    * ```
    */
  get voters(): Prisma.votersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    audit_logs: 'audit_logs',
    candidates: 'candidates',
    districts: 'districts',
    elections: 'elections',
    parties: 'parties',
    voters: 'voters'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "audit_logs" | "candidates" | "districts" | "elections" | "parties" | "voters"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      audit_logs: {
        payload: Prisma.$audit_logsPayload<ExtArgs>
        fields: Prisma.audit_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.audit_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.audit_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          findFirst: {
            args: Prisma.audit_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.audit_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          findMany: {
            args: Prisma.audit_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>[]
          }
          create: {
            args: Prisma.audit_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          createMany: {
            args: Prisma.audit_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.audit_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          update: {
            args: Prisma.audit_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          deleteMany: {
            args: Prisma.audit_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.audit_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.audit_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          aggregate: {
            args: Prisma.Audit_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAudit_logs>
          }
          groupBy: {
            args: Prisma.audit_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Audit_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.audit_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Audit_logsCountAggregateOutputType> | number
          }
        }
      }
      candidates: {
        payload: Prisma.$candidatesPayload<ExtArgs>
        fields: Prisma.candidatesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.candidatesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$candidatesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.candidatesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$candidatesPayload>
          }
          findFirst: {
            args: Prisma.candidatesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$candidatesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.candidatesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$candidatesPayload>
          }
          findMany: {
            args: Prisma.candidatesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$candidatesPayload>[]
          }
          create: {
            args: Prisma.candidatesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$candidatesPayload>
          }
          createMany: {
            args: Prisma.candidatesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.candidatesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$candidatesPayload>
          }
          update: {
            args: Prisma.candidatesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$candidatesPayload>
          }
          deleteMany: {
            args: Prisma.candidatesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.candidatesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.candidatesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$candidatesPayload>
          }
          aggregate: {
            args: Prisma.CandidatesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandidates>
          }
          groupBy: {
            args: Prisma.candidatesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandidatesGroupByOutputType>[]
          }
          count: {
            args: Prisma.candidatesCountArgs<ExtArgs>
            result: $Utils.Optional<CandidatesCountAggregateOutputType> | number
          }
        }
      }
      districts: {
        payload: Prisma.$districtsPayload<ExtArgs>
        fields: Prisma.districtsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.districtsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$districtsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.districtsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$districtsPayload>
          }
          findFirst: {
            args: Prisma.districtsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$districtsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.districtsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$districtsPayload>
          }
          findMany: {
            args: Prisma.districtsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$districtsPayload>[]
          }
          create: {
            args: Prisma.districtsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$districtsPayload>
          }
          createMany: {
            args: Prisma.districtsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.districtsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$districtsPayload>
          }
          update: {
            args: Prisma.districtsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$districtsPayload>
          }
          deleteMany: {
            args: Prisma.districtsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.districtsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.districtsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$districtsPayload>
          }
          aggregate: {
            args: Prisma.DistrictsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDistricts>
          }
          groupBy: {
            args: Prisma.districtsGroupByArgs<ExtArgs>
            result: $Utils.Optional<DistrictsGroupByOutputType>[]
          }
          count: {
            args: Prisma.districtsCountArgs<ExtArgs>
            result: $Utils.Optional<DistrictsCountAggregateOutputType> | number
          }
        }
      }
      elections: {
        payload: Prisma.$electionsPayload<ExtArgs>
        fields: Prisma.electionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.electionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.electionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionsPayload>
          }
          findFirst: {
            args: Prisma.electionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.electionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionsPayload>
          }
          findMany: {
            args: Prisma.electionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionsPayload>[]
          }
          create: {
            args: Prisma.electionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionsPayload>
          }
          createMany: {
            args: Prisma.electionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.electionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionsPayload>
          }
          update: {
            args: Prisma.electionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionsPayload>
          }
          deleteMany: {
            args: Prisma.electionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.electionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.electionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionsPayload>
          }
          aggregate: {
            args: Prisma.ElectionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElections>
          }
          groupBy: {
            args: Prisma.electionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElectionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.electionsCountArgs<ExtArgs>
            result: $Utils.Optional<ElectionsCountAggregateOutputType> | number
          }
        }
      }
      parties: {
        payload: Prisma.$partiesPayload<ExtArgs>
        fields: Prisma.partiesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.partiesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$partiesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.partiesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$partiesPayload>
          }
          findFirst: {
            args: Prisma.partiesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$partiesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.partiesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$partiesPayload>
          }
          findMany: {
            args: Prisma.partiesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$partiesPayload>[]
          }
          create: {
            args: Prisma.partiesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$partiesPayload>
          }
          createMany: {
            args: Prisma.partiesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.partiesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$partiesPayload>
          }
          update: {
            args: Prisma.partiesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$partiesPayload>
          }
          deleteMany: {
            args: Prisma.partiesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.partiesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.partiesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$partiesPayload>
          }
          aggregate: {
            args: Prisma.PartiesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParties>
          }
          groupBy: {
            args: Prisma.partiesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartiesGroupByOutputType>[]
          }
          count: {
            args: Prisma.partiesCountArgs<ExtArgs>
            result: $Utils.Optional<PartiesCountAggregateOutputType> | number
          }
        }
      }
      voters: {
        payload: Prisma.$votersPayload<ExtArgs>
        fields: Prisma.votersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.votersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$votersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.votersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$votersPayload>
          }
          findFirst: {
            args: Prisma.votersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$votersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.votersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$votersPayload>
          }
          findMany: {
            args: Prisma.votersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$votersPayload>[]
          }
          create: {
            args: Prisma.votersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$votersPayload>
          }
          createMany: {
            args: Prisma.votersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.votersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$votersPayload>
          }
          update: {
            args: Prisma.votersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$votersPayload>
          }
          deleteMany: {
            args: Prisma.votersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.votersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.votersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$votersPayload>
          }
          aggregate: {
            args: Prisma.VotersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVoters>
          }
          groupBy: {
            args: Prisma.votersGroupByArgs<ExtArgs>
            result: $Utils.Optional<VotersGroupByOutputType>[]
          }
          count: {
            args: Prisma.votersCountArgs<ExtArgs>
            result: $Utils.Optional<VotersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    audit_logs?: audit_logsOmit
    candidates?: candidatesOmit
    districts?: districtsOmit
    elections?: electionsOmit
    parties?: partiesOmit
    voters?: votersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    audit_logs: number
    elections: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audit_logs?: boolean | UsersCountOutputTypeCountAudit_logsArgs
    elections?: boolean | UsersCountOutputTypeCountElectionsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountAudit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: audit_logsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountElectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: electionsWhereInput
  }


  /**
   * Count Type DistrictsCountOutputType
   */

  export type DistrictsCountOutputType = {
    candidates: number
    voters: number
  }

  export type DistrictsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | DistrictsCountOutputTypeCountCandidatesArgs
    voters?: boolean | DistrictsCountOutputTypeCountVotersArgs
  }

  // Custom InputTypes
  /**
   * DistrictsCountOutputType without action
   */
  export type DistrictsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistrictsCountOutputType
     */
    select?: DistrictsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DistrictsCountOutputType without action
   */
  export type DistrictsCountOutputTypeCountCandidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: candidatesWhereInput
  }

  /**
   * DistrictsCountOutputType without action
   */
  export type DistrictsCountOutputTypeCountVotersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: votersWhereInput
  }


  /**
   * Count Type ElectionsCountOutputType
   */

  export type ElectionsCountOutputType = {
    candidates: number
    districts: number
    voters: number
  }

  export type ElectionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | ElectionsCountOutputTypeCountCandidatesArgs
    districts?: boolean | ElectionsCountOutputTypeCountDistrictsArgs
    voters?: boolean | ElectionsCountOutputTypeCountVotersArgs
  }

  // Custom InputTypes
  /**
   * ElectionsCountOutputType without action
   */
  export type ElectionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionsCountOutputType
     */
    select?: ElectionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ElectionsCountOutputType without action
   */
  export type ElectionsCountOutputTypeCountCandidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: candidatesWhereInput
  }

  /**
   * ElectionsCountOutputType without action
   */
  export type ElectionsCountOutputTypeCountDistrictsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: districtsWhereInput
  }

  /**
   * ElectionsCountOutputType without action
   */
  export type ElectionsCountOutputTypeCountVotersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: votersWhereInput
  }


  /**
   * Count Type PartiesCountOutputType
   */

  export type PartiesCountOutputType = {
    candidates: number
  }

  export type PartiesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | PartiesCountOutputTypeCountCandidatesArgs
  }

  // Custom InputTypes
  /**
   * PartiesCountOutputType without action
   */
  export type PartiesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartiesCountOutputType
     */
    select?: PartiesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartiesCountOutputType without action
   */
  export type PartiesCountOutputTypeCountCandidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: candidatesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: bigint | null
  }

  export type UsersMinAggregateOutputType = {
    id: bigint | null
    username: string | null
    password_hash: string | null
    role: $Enums.users_role | null
    email: string | null
    twofa_secret: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: bigint | null
    username: string | null
    password_hash: string | null
    role: $Enums.users_role | null
    email: string | null
    twofa_secret: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    password_hash: number
    role: number
    email: number
    twofa_secret: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    role?: true
    email?: true
    twofa_secret?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    role?: true
    email?: true
    twofa_secret?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    role?: true
    email?: true
    twofa_secret?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: bigint
    username: string
    password_hash: string
    role: $Enums.users_role
    email: string | null
    twofa_secret: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password_hash?: boolean
    role?: boolean
    email?: boolean
    twofa_secret?: boolean
    created_at?: boolean
    updated_at?: boolean
    audit_logs?: boolean | users$audit_logsArgs<ExtArgs>
    elections?: boolean | users$electionsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type usersSelectScalar = {
    id?: boolean
    username?: boolean
    password_hash?: boolean
    role?: boolean
    email?: boolean
    twofa_secret?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password_hash" | "role" | "email" | "twofa_secret" | "created_at" | "updated_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    audit_logs?: boolean | users$audit_logsArgs<ExtArgs>
    elections?: boolean | users$electionsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      audit_logs: Prisma.$audit_logsPayload<ExtArgs>[]
      elections: Prisma.$electionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      username: string
      password_hash: string
      role: $Enums.users_role
      email: string | null
      twofa_secret: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    audit_logs<T extends users$audit_logsArgs<ExtArgs> = {}>(args?: Subset<T, users$audit_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    elections<T extends users$electionsArgs<ExtArgs> = {}>(args?: Subset<T, users$electionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'BigInt'>
    readonly username: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'users_role'>
    readonly email: FieldRef<"users", 'String'>
    readonly twofa_secret: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.audit_logs
   */
  export type users$audit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    where?: audit_logsWhereInput
    orderBy?: audit_logsOrderByWithRelationInput | audit_logsOrderByWithRelationInput[]
    cursor?: audit_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Audit_logsScalarFieldEnum | Audit_logsScalarFieldEnum[]
  }

  /**
   * users.elections
   */
  export type users$electionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the elections
     */
    select?: electionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the elections
     */
    omit?: electionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionsInclude<ExtArgs> | null
    where?: electionsWhereInput
    orderBy?: electionsOrderByWithRelationInput | electionsOrderByWithRelationInput[]
    cursor?: electionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElectionsScalarFieldEnum | ElectionsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model audit_logs
   */

  export type AggregateAudit_logs = {
    _count: Audit_logsCountAggregateOutputType | null
    _avg: Audit_logsAvgAggregateOutputType | null
    _sum: Audit_logsSumAggregateOutputType | null
    _min: Audit_logsMinAggregateOutputType | null
    _max: Audit_logsMaxAggregateOutputType | null
  }

  export type Audit_logsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    entity_id: number | null
  }

  export type Audit_logsSumAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    entity_id: bigint | null
  }

  export type Audit_logsMinAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    action: string | null
    entity: string | null
    entity_id: bigint | null
    details: string | null
    created_at: Date | null
  }

  export type Audit_logsMaxAggregateOutputType = {
    id: bigint | null
    user_id: bigint | null
    action: string | null
    entity: string | null
    entity_id: bigint | null
    details: string | null
    created_at: Date | null
  }

  export type Audit_logsCountAggregateOutputType = {
    id: number
    user_id: number
    action: number
    entity: number
    entity_id: number
    details: number
    created_at: number
    _all: number
  }


  export type Audit_logsAvgAggregateInputType = {
    id?: true
    user_id?: true
    entity_id?: true
  }

  export type Audit_logsSumAggregateInputType = {
    id?: true
    user_id?: true
    entity_id?: true
  }

  export type Audit_logsMinAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    entity?: true
    entity_id?: true
    details?: true
    created_at?: true
  }

  export type Audit_logsMaxAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    entity?: true
    entity_id?: true
    details?: true
    created_at?: true
  }

  export type Audit_logsCountAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    entity?: true
    entity_id?: true
    details?: true
    created_at?: true
    _all?: true
  }

  export type Audit_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which audit_logs to aggregate.
     */
    where?: audit_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_logs to fetch.
     */
    orderBy?: audit_logsOrderByWithRelationInput | audit_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: audit_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned audit_logs
    **/
    _count?: true | Audit_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Audit_logsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Audit_logsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Audit_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Audit_logsMaxAggregateInputType
  }

  export type GetAudit_logsAggregateType<T extends Audit_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateAudit_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAudit_logs[P]>
      : GetScalarType<T[P], AggregateAudit_logs[P]>
  }




  export type audit_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: audit_logsWhereInput
    orderBy?: audit_logsOrderByWithAggregationInput | audit_logsOrderByWithAggregationInput[]
    by: Audit_logsScalarFieldEnum[] | Audit_logsScalarFieldEnum
    having?: audit_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Audit_logsCountAggregateInputType | true
    _avg?: Audit_logsAvgAggregateInputType
    _sum?: Audit_logsSumAggregateInputType
    _min?: Audit_logsMinAggregateInputType
    _max?: Audit_logsMaxAggregateInputType
  }

  export type Audit_logsGroupByOutputType = {
    id: bigint
    user_id: bigint | null
    action: string
    entity: string | null
    entity_id: bigint | null
    details: string | null
    created_at: Date | null
    _count: Audit_logsCountAggregateOutputType | null
    _avg: Audit_logsAvgAggregateOutputType | null
    _sum: Audit_logsSumAggregateOutputType | null
    _min: Audit_logsMinAggregateOutputType | null
    _max: Audit_logsMaxAggregateOutputType | null
  }

  type GetAudit_logsGroupByPayload<T extends audit_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Audit_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Audit_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Audit_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Audit_logsGroupByOutputType[P]>
        }
      >
    >


  export type audit_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    action?: boolean
    entity?: boolean
    entity_id?: boolean
    details?: boolean
    created_at?: boolean
    users?: boolean | audit_logs$usersArgs<ExtArgs>
  }, ExtArgs["result"]["audit_logs"]>



  export type audit_logsSelectScalar = {
    id?: boolean
    user_id?: boolean
    action?: boolean
    entity?: boolean
    entity_id?: boolean
    details?: boolean
    created_at?: boolean
  }

  export type audit_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "action" | "entity" | "entity_id" | "details" | "created_at", ExtArgs["result"]["audit_logs"]>
  export type audit_logsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | audit_logs$usersArgs<ExtArgs>
  }

  export type $audit_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "audit_logs"
    objects: {
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      user_id: bigint | null
      action: string
      entity: string | null
      entity_id: bigint | null
      details: string | null
      created_at: Date | null
    }, ExtArgs["result"]["audit_logs"]>
    composites: {}
  }

  type audit_logsGetPayload<S extends boolean | null | undefined | audit_logsDefaultArgs> = $Result.GetResult<Prisma.$audit_logsPayload, S>

  type audit_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<audit_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Audit_logsCountAggregateInputType | true
    }

  export interface audit_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['audit_logs'], meta: { name: 'audit_logs' } }
    /**
     * Find zero or one Audit_logs that matches the filter.
     * @param {audit_logsFindUniqueArgs} args - Arguments to find a Audit_logs
     * @example
     * // Get one Audit_logs
     * const audit_logs = await prisma.audit_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends audit_logsFindUniqueArgs>(args: SelectSubset<T, audit_logsFindUniqueArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Audit_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {audit_logsFindUniqueOrThrowArgs} args - Arguments to find a Audit_logs
     * @example
     * // Get one Audit_logs
     * const audit_logs = await prisma.audit_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends audit_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, audit_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Audit_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsFindFirstArgs} args - Arguments to find a Audit_logs
     * @example
     * // Get one Audit_logs
     * const audit_logs = await prisma.audit_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends audit_logsFindFirstArgs>(args?: SelectSubset<T, audit_logsFindFirstArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Audit_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsFindFirstOrThrowArgs} args - Arguments to find a Audit_logs
     * @example
     * // Get one Audit_logs
     * const audit_logs = await prisma.audit_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends audit_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, audit_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Audit_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Audit_logs
     * const audit_logs = await prisma.audit_logs.findMany()
     * 
     * // Get first 10 Audit_logs
     * const audit_logs = await prisma.audit_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const audit_logsWithIdOnly = await prisma.audit_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends audit_logsFindManyArgs>(args?: SelectSubset<T, audit_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Audit_logs.
     * @param {audit_logsCreateArgs} args - Arguments to create a Audit_logs.
     * @example
     * // Create one Audit_logs
     * const Audit_logs = await prisma.audit_logs.create({
     *   data: {
     *     // ... data to create a Audit_logs
     *   }
     * })
     * 
     */
    create<T extends audit_logsCreateArgs>(args: SelectSubset<T, audit_logsCreateArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Audit_logs.
     * @param {audit_logsCreateManyArgs} args - Arguments to create many Audit_logs.
     * @example
     * // Create many Audit_logs
     * const audit_logs = await prisma.audit_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends audit_logsCreateManyArgs>(args?: SelectSubset<T, audit_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Audit_logs.
     * @param {audit_logsDeleteArgs} args - Arguments to delete one Audit_logs.
     * @example
     * // Delete one Audit_logs
     * const Audit_logs = await prisma.audit_logs.delete({
     *   where: {
     *     // ... filter to delete one Audit_logs
     *   }
     * })
     * 
     */
    delete<T extends audit_logsDeleteArgs>(args: SelectSubset<T, audit_logsDeleteArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Audit_logs.
     * @param {audit_logsUpdateArgs} args - Arguments to update one Audit_logs.
     * @example
     * // Update one Audit_logs
     * const audit_logs = await prisma.audit_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends audit_logsUpdateArgs>(args: SelectSubset<T, audit_logsUpdateArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Audit_logs.
     * @param {audit_logsDeleteManyArgs} args - Arguments to filter Audit_logs to delete.
     * @example
     * // Delete a few Audit_logs
     * const { count } = await prisma.audit_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends audit_logsDeleteManyArgs>(args?: SelectSubset<T, audit_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Audit_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Audit_logs
     * const audit_logs = await prisma.audit_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends audit_logsUpdateManyArgs>(args: SelectSubset<T, audit_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Audit_logs.
     * @param {audit_logsUpsertArgs} args - Arguments to update or create a Audit_logs.
     * @example
     * // Update or create a Audit_logs
     * const audit_logs = await prisma.audit_logs.upsert({
     *   create: {
     *     // ... data to create a Audit_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Audit_logs we want to update
     *   }
     * })
     */
    upsert<T extends audit_logsUpsertArgs>(args: SelectSubset<T, audit_logsUpsertArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Audit_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsCountArgs} args - Arguments to filter Audit_logs to count.
     * @example
     * // Count the number of Audit_logs
     * const count = await prisma.audit_logs.count({
     *   where: {
     *     // ... the filter for the Audit_logs we want to count
     *   }
     * })
    **/
    count<T extends audit_logsCountArgs>(
      args?: Subset<T, audit_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Audit_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Audit_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Audit_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Audit_logsAggregateArgs>(args: Subset<T, Audit_logsAggregateArgs>): Prisma.PrismaPromise<GetAudit_logsAggregateType<T>>

    /**
     * Group by Audit_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends audit_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: audit_logsGroupByArgs['orderBy'] }
        : { orderBy?: audit_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, audit_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAudit_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the audit_logs model
   */
  readonly fields: audit_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for audit_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__audit_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends audit_logs$usersArgs<ExtArgs> = {}>(args?: Subset<T, audit_logs$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the audit_logs model
   */
  interface audit_logsFieldRefs {
    readonly id: FieldRef<"audit_logs", 'BigInt'>
    readonly user_id: FieldRef<"audit_logs", 'BigInt'>
    readonly action: FieldRef<"audit_logs", 'String'>
    readonly entity: FieldRef<"audit_logs", 'String'>
    readonly entity_id: FieldRef<"audit_logs", 'BigInt'>
    readonly details: FieldRef<"audit_logs", 'String'>
    readonly created_at: FieldRef<"audit_logs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * audit_logs findUnique
   */
  export type audit_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter, which audit_logs to fetch.
     */
    where: audit_logsWhereUniqueInput
  }

  /**
   * audit_logs findUniqueOrThrow
   */
  export type audit_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter, which audit_logs to fetch.
     */
    where: audit_logsWhereUniqueInput
  }

  /**
   * audit_logs findFirst
   */
  export type audit_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter, which audit_logs to fetch.
     */
    where?: audit_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_logs to fetch.
     */
    orderBy?: audit_logsOrderByWithRelationInput | audit_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for audit_logs.
     */
    cursor?: audit_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of audit_logs.
     */
    distinct?: Audit_logsScalarFieldEnum | Audit_logsScalarFieldEnum[]
  }

  /**
   * audit_logs findFirstOrThrow
   */
  export type audit_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter, which audit_logs to fetch.
     */
    where?: audit_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_logs to fetch.
     */
    orderBy?: audit_logsOrderByWithRelationInput | audit_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for audit_logs.
     */
    cursor?: audit_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of audit_logs.
     */
    distinct?: Audit_logsScalarFieldEnum | Audit_logsScalarFieldEnum[]
  }

  /**
   * audit_logs findMany
   */
  export type audit_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter, which audit_logs to fetch.
     */
    where?: audit_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_logs to fetch.
     */
    orderBy?: audit_logsOrderByWithRelationInput | audit_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing audit_logs.
     */
    cursor?: audit_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_logs.
     */
    skip?: number
    distinct?: Audit_logsScalarFieldEnum | Audit_logsScalarFieldEnum[]
  }

  /**
   * audit_logs create
   */
  export type audit_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * The data needed to create a audit_logs.
     */
    data: XOR<audit_logsCreateInput, audit_logsUncheckedCreateInput>
  }

  /**
   * audit_logs createMany
   */
  export type audit_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many audit_logs.
     */
    data: audit_logsCreateManyInput | audit_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * audit_logs update
   */
  export type audit_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * The data needed to update a audit_logs.
     */
    data: XOR<audit_logsUpdateInput, audit_logsUncheckedUpdateInput>
    /**
     * Choose, which audit_logs to update.
     */
    where: audit_logsWhereUniqueInput
  }

  /**
   * audit_logs updateMany
   */
  export type audit_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update audit_logs.
     */
    data: XOR<audit_logsUpdateManyMutationInput, audit_logsUncheckedUpdateManyInput>
    /**
     * Filter which audit_logs to update
     */
    where?: audit_logsWhereInput
    /**
     * Limit how many audit_logs to update.
     */
    limit?: number
  }

  /**
   * audit_logs upsert
   */
  export type audit_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * The filter to search for the audit_logs to update in case it exists.
     */
    where: audit_logsWhereUniqueInput
    /**
     * In case the audit_logs found by the `where` argument doesn't exist, create a new audit_logs with this data.
     */
    create: XOR<audit_logsCreateInput, audit_logsUncheckedCreateInput>
    /**
     * In case the audit_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<audit_logsUpdateInput, audit_logsUncheckedUpdateInput>
  }

  /**
   * audit_logs delete
   */
  export type audit_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter which audit_logs to delete.
     */
    where: audit_logsWhereUniqueInput
  }

  /**
   * audit_logs deleteMany
   */
  export type audit_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which audit_logs to delete
     */
    where?: audit_logsWhereInput
    /**
     * Limit how many audit_logs to delete.
     */
    limit?: number
  }

  /**
   * audit_logs.users
   */
  export type audit_logs$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * audit_logs without action
   */
  export type audit_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
  }


  /**
   * Model candidates
   */

  export type AggregateCandidates = {
    _count: CandidatesCountAggregateOutputType | null
    _avg: CandidatesAvgAggregateOutputType | null
    _sum: CandidatesSumAggregateOutputType | null
    _min: CandidatesMinAggregateOutputType | null
    _max: CandidatesMaxAggregateOutputType | null
  }

  export type CandidatesAvgAggregateOutputType = {
    id: number | null
    election_id: number | null
    party_id: number | null
    district_id: number | null
  }

  export type CandidatesSumAggregateOutputType = {
    id: bigint | null
    election_id: bigint | null
    party_id: bigint | null
    district_id: bigint | null
  }

  export type CandidatesMinAggregateOutputType = {
    id: bigint | null
    election_id: bigint | null
    party_id: bigint | null
    district_id: bigint | null
    name: string | null
    bio: string | null
    photo_url: string | null
    created_at: Date | null
  }

  export type CandidatesMaxAggregateOutputType = {
    id: bigint | null
    election_id: bigint | null
    party_id: bigint | null
    district_id: bigint | null
    name: string | null
    bio: string | null
    photo_url: string | null
    created_at: Date | null
  }

  export type CandidatesCountAggregateOutputType = {
    id: number
    election_id: number
    party_id: number
    district_id: number
    name: number
    bio: number
    photo_url: number
    created_at: number
    _all: number
  }


  export type CandidatesAvgAggregateInputType = {
    id?: true
    election_id?: true
    party_id?: true
    district_id?: true
  }

  export type CandidatesSumAggregateInputType = {
    id?: true
    election_id?: true
    party_id?: true
    district_id?: true
  }

  export type CandidatesMinAggregateInputType = {
    id?: true
    election_id?: true
    party_id?: true
    district_id?: true
    name?: true
    bio?: true
    photo_url?: true
    created_at?: true
  }

  export type CandidatesMaxAggregateInputType = {
    id?: true
    election_id?: true
    party_id?: true
    district_id?: true
    name?: true
    bio?: true
    photo_url?: true
    created_at?: true
  }

  export type CandidatesCountAggregateInputType = {
    id?: true
    election_id?: true
    party_id?: true
    district_id?: true
    name?: true
    bio?: true
    photo_url?: true
    created_at?: true
    _all?: true
  }

  export type CandidatesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which candidates to aggregate.
     */
    where?: candidatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of candidates to fetch.
     */
    orderBy?: candidatesOrderByWithRelationInput | candidatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: candidatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned candidates
    **/
    _count?: true | CandidatesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CandidatesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CandidatesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandidatesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandidatesMaxAggregateInputType
  }

  export type GetCandidatesAggregateType<T extends CandidatesAggregateArgs> = {
        [P in keyof T & keyof AggregateCandidates]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandidates[P]>
      : GetScalarType<T[P], AggregateCandidates[P]>
  }




  export type candidatesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: candidatesWhereInput
    orderBy?: candidatesOrderByWithAggregationInput | candidatesOrderByWithAggregationInput[]
    by: CandidatesScalarFieldEnum[] | CandidatesScalarFieldEnum
    having?: candidatesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandidatesCountAggregateInputType | true
    _avg?: CandidatesAvgAggregateInputType
    _sum?: CandidatesSumAggregateInputType
    _min?: CandidatesMinAggregateInputType
    _max?: CandidatesMaxAggregateInputType
  }

  export type CandidatesGroupByOutputType = {
    id: bigint
    election_id: bigint
    party_id: bigint | null
    district_id: bigint
    name: string
    bio: string | null
    photo_url: string | null
    created_at: Date | null
    _count: CandidatesCountAggregateOutputType | null
    _avg: CandidatesAvgAggregateOutputType | null
    _sum: CandidatesSumAggregateOutputType | null
    _min: CandidatesMinAggregateOutputType | null
    _max: CandidatesMaxAggregateOutputType | null
  }

  type GetCandidatesGroupByPayload<T extends candidatesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandidatesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandidatesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandidatesGroupByOutputType[P]>
            : GetScalarType<T[P], CandidatesGroupByOutputType[P]>
        }
      >
    >


  export type candidatesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    election_id?: boolean
    party_id?: boolean
    district_id?: boolean
    name?: boolean
    bio?: boolean
    photo_url?: boolean
    created_at?: boolean
    elections?: boolean | electionsDefaultArgs<ExtArgs>
    parties?: boolean | candidates$partiesArgs<ExtArgs>
    districts?: boolean | districtsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidates"]>



  export type candidatesSelectScalar = {
    id?: boolean
    election_id?: boolean
    party_id?: boolean
    district_id?: boolean
    name?: boolean
    bio?: boolean
    photo_url?: boolean
    created_at?: boolean
  }

  export type candidatesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "election_id" | "party_id" | "district_id" | "name" | "bio" | "photo_url" | "created_at", ExtArgs["result"]["candidates"]>
  export type candidatesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elections?: boolean | electionsDefaultArgs<ExtArgs>
    parties?: boolean | candidates$partiesArgs<ExtArgs>
    districts?: boolean | districtsDefaultArgs<ExtArgs>
  }

  export type $candidatesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "candidates"
    objects: {
      elections: Prisma.$electionsPayload<ExtArgs>
      parties: Prisma.$partiesPayload<ExtArgs> | null
      districts: Prisma.$districtsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      election_id: bigint
      party_id: bigint | null
      district_id: bigint
      name: string
      bio: string | null
      photo_url: string | null
      created_at: Date | null
    }, ExtArgs["result"]["candidates"]>
    composites: {}
  }

  type candidatesGetPayload<S extends boolean | null | undefined | candidatesDefaultArgs> = $Result.GetResult<Prisma.$candidatesPayload, S>

  type candidatesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<candidatesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CandidatesCountAggregateInputType | true
    }

  export interface candidatesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['candidates'], meta: { name: 'candidates' } }
    /**
     * Find zero or one Candidates that matches the filter.
     * @param {candidatesFindUniqueArgs} args - Arguments to find a Candidates
     * @example
     * // Get one Candidates
     * const candidates = await prisma.candidates.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends candidatesFindUniqueArgs>(args: SelectSubset<T, candidatesFindUniqueArgs<ExtArgs>>): Prisma__candidatesClient<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Candidates that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {candidatesFindUniqueOrThrowArgs} args - Arguments to find a Candidates
     * @example
     * // Get one Candidates
     * const candidates = await prisma.candidates.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends candidatesFindUniqueOrThrowArgs>(args: SelectSubset<T, candidatesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__candidatesClient<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {candidatesFindFirstArgs} args - Arguments to find a Candidates
     * @example
     * // Get one Candidates
     * const candidates = await prisma.candidates.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends candidatesFindFirstArgs>(args?: SelectSubset<T, candidatesFindFirstArgs<ExtArgs>>): Prisma__candidatesClient<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidates that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {candidatesFindFirstOrThrowArgs} args - Arguments to find a Candidates
     * @example
     * // Get one Candidates
     * const candidates = await prisma.candidates.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends candidatesFindFirstOrThrowArgs>(args?: SelectSubset<T, candidatesFindFirstOrThrowArgs<ExtArgs>>): Prisma__candidatesClient<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Candidates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {candidatesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Candidates
     * const candidates = await prisma.candidates.findMany()
     * 
     * // Get first 10 Candidates
     * const candidates = await prisma.candidates.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candidatesWithIdOnly = await prisma.candidates.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends candidatesFindManyArgs>(args?: SelectSubset<T, candidatesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Candidates.
     * @param {candidatesCreateArgs} args - Arguments to create a Candidates.
     * @example
     * // Create one Candidates
     * const Candidates = await prisma.candidates.create({
     *   data: {
     *     // ... data to create a Candidates
     *   }
     * })
     * 
     */
    create<T extends candidatesCreateArgs>(args: SelectSubset<T, candidatesCreateArgs<ExtArgs>>): Prisma__candidatesClient<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Candidates.
     * @param {candidatesCreateManyArgs} args - Arguments to create many Candidates.
     * @example
     * // Create many Candidates
     * const candidates = await prisma.candidates.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends candidatesCreateManyArgs>(args?: SelectSubset<T, candidatesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Candidates.
     * @param {candidatesDeleteArgs} args - Arguments to delete one Candidates.
     * @example
     * // Delete one Candidates
     * const Candidates = await prisma.candidates.delete({
     *   where: {
     *     // ... filter to delete one Candidates
     *   }
     * })
     * 
     */
    delete<T extends candidatesDeleteArgs>(args: SelectSubset<T, candidatesDeleteArgs<ExtArgs>>): Prisma__candidatesClient<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Candidates.
     * @param {candidatesUpdateArgs} args - Arguments to update one Candidates.
     * @example
     * // Update one Candidates
     * const candidates = await prisma.candidates.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends candidatesUpdateArgs>(args: SelectSubset<T, candidatesUpdateArgs<ExtArgs>>): Prisma__candidatesClient<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Candidates.
     * @param {candidatesDeleteManyArgs} args - Arguments to filter Candidates to delete.
     * @example
     * // Delete a few Candidates
     * const { count } = await prisma.candidates.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends candidatesDeleteManyArgs>(args?: SelectSubset<T, candidatesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {candidatesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Candidates
     * const candidates = await prisma.candidates.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends candidatesUpdateManyArgs>(args: SelectSubset<T, candidatesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Candidates.
     * @param {candidatesUpsertArgs} args - Arguments to update or create a Candidates.
     * @example
     * // Update or create a Candidates
     * const candidates = await prisma.candidates.upsert({
     *   create: {
     *     // ... data to create a Candidates
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Candidates we want to update
     *   }
     * })
     */
    upsert<T extends candidatesUpsertArgs>(args: SelectSubset<T, candidatesUpsertArgs<ExtArgs>>): Prisma__candidatesClient<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {candidatesCountArgs} args - Arguments to filter Candidates to count.
     * @example
     * // Count the number of Candidates
     * const count = await prisma.candidates.count({
     *   where: {
     *     // ... the filter for the Candidates we want to count
     *   }
     * })
    **/
    count<T extends candidatesCountArgs>(
      args?: Subset<T, candidatesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandidatesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidatesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CandidatesAggregateArgs>(args: Subset<T, CandidatesAggregateArgs>): Prisma.PrismaPromise<GetCandidatesAggregateType<T>>

    /**
     * Group by Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {candidatesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends candidatesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: candidatesGroupByArgs['orderBy'] }
        : { orderBy?: candidatesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, candidatesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandidatesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the candidates model
   */
  readonly fields: candidatesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for candidates.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__candidatesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    elections<T extends electionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, electionsDefaultArgs<ExtArgs>>): Prisma__electionsClient<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parties<T extends candidates$partiesArgs<ExtArgs> = {}>(args?: Subset<T, candidates$partiesArgs<ExtArgs>>): Prisma__partiesClient<$Result.GetResult<Prisma.$partiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    districts<T extends districtsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, districtsDefaultArgs<ExtArgs>>): Prisma__districtsClient<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the candidates model
   */
  interface candidatesFieldRefs {
    readonly id: FieldRef<"candidates", 'BigInt'>
    readonly election_id: FieldRef<"candidates", 'BigInt'>
    readonly party_id: FieldRef<"candidates", 'BigInt'>
    readonly district_id: FieldRef<"candidates", 'BigInt'>
    readonly name: FieldRef<"candidates", 'String'>
    readonly bio: FieldRef<"candidates", 'String'>
    readonly photo_url: FieldRef<"candidates", 'String'>
    readonly created_at: FieldRef<"candidates", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * candidates findUnique
   */
  export type candidatesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    /**
     * Filter, which candidates to fetch.
     */
    where: candidatesWhereUniqueInput
  }

  /**
   * candidates findUniqueOrThrow
   */
  export type candidatesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    /**
     * Filter, which candidates to fetch.
     */
    where: candidatesWhereUniqueInput
  }

  /**
   * candidates findFirst
   */
  export type candidatesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    /**
     * Filter, which candidates to fetch.
     */
    where?: candidatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of candidates to fetch.
     */
    orderBy?: candidatesOrderByWithRelationInput | candidatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for candidates.
     */
    cursor?: candidatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of candidates.
     */
    distinct?: CandidatesScalarFieldEnum | CandidatesScalarFieldEnum[]
  }

  /**
   * candidates findFirstOrThrow
   */
  export type candidatesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    /**
     * Filter, which candidates to fetch.
     */
    where?: candidatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of candidates to fetch.
     */
    orderBy?: candidatesOrderByWithRelationInput | candidatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for candidates.
     */
    cursor?: candidatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of candidates.
     */
    distinct?: CandidatesScalarFieldEnum | CandidatesScalarFieldEnum[]
  }

  /**
   * candidates findMany
   */
  export type candidatesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    /**
     * Filter, which candidates to fetch.
     */
    where?: candidatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of candidates to fetch.
     */
    orderBy?: candidatesOrderByWithRelationInput | candidatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing candidates.
     */
    cursor?: candidatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` candidates.
     */
    skip?: number
    distinct?: CandidatesScalarFieldEnum | CandidatesScalarFieldEnum[]
  }

  /**
   * candidates create
   */
  export type candidatesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    /**
     * The data needed to create a candidates.
     */
    data: XOR<candidatesCreateInput, candidatesUncheckedCreateInput>
  }

  /**
   * candidates createMany
   */
  export type candidatesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many candidates.
     */
    data: candidatesCreateManyInput | candidatesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * candidates update
   */
  export type candidatesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    /**
     * The data needed to update a candidates.
     */
    data: XOR<candidatesUpdateInput, candidatesUncheckedUpdateInput>
    /**
     * Choose, which candidates to update.
     */
    where: candidatesWhereUniqueInput
  }

  /**
   * candidates updateMany
   */
  export type candidatesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update candidates.
     */
    data: XOR<candidatesUpdateManyMutationInput, candidatesUncheckedUpdateManyInput>
    /**
     * Filter which candidates to update
     */
    where?: candidatesWhereInput
    /**
     * Limit how many candidates to update.
     */
    limit?: number
  }

  /**
   * candidates upsert
   */
  export type candidatesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    /**
     * The filter to search for the candidates to update in case it exists.
     */
    where: candidatesWhereUniqueInput
    /**
     * In case the candidates found by the `where` argument doesn't exist, create a new candidates with this data.
     */
    create: XOR<candidatesCreateInput, candidatesUncheckedCreateInput>
    /**
     * In case the candidates was found with the provided `where` argument, update it with this data.
     */
    update: XOR<candidatesUpdateInput, candidatesUncheckedUpdateInput>
  }

  /**
   * candidates delete
   */
  export type candidatesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    /**
     * Filter which candidates to delete.
     */
    where: candidatesWhereUniqueInput
  }

  /**
   * candidates deleteMany
   */
  export type candidatesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which candidates to delete
     */
    where?: candidatesWhereInput
    /**
     * Limit how many candidates to delete.
     */
    limit?: number
  }

  /**
   * candidates.parties
   */
  export type candidates$partiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the parties
     */
    select?: partiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the parties
     */
    omit?: partiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: partiesInclude<ExtArgs> | null
    where?: partiesWhereInput
  }

  /**
   * candidates without action
   */
  export type candidatesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
  }


  /**
   * Model districts
   */

  export type AggregateDistricts = {
    _count: DistrictsCountAggregateOutputType | null
    _avg: DistrictsAvgAggregateOutputType | null
    _sum: DistrictsSumAggregateOutputType | null
    _min: DistrictsMinAggregateOutputType | null
    _max: DistrictsMaxAggregateOutputType | null
  }

  export type DistrictsAvgAggregateOutputType = {
    id: number | null
    election_id: number | null
  }

  export type DistrictsSumAggregateOutputType = {
    id: bigint | null
    election_id: bigint | null
  }

  export type DistrictsMinAggregateOutputType = {
    id: bigint | null
    election_id: bigint | null
    name: string | null
    description: string | null
    created_at: Date | null
  }

  export type DistrictsMaxAggregateOutputType = {
    id: bigint | null
    election_id: bigint | null
    name: string | null
    description: string | null
    created_at: Date | null
  }

  export type DistrictsCountAggregateOutputType = {
    id: number
    election_id: number
    name: number
    description: number
    created_at: number
    _all: number
  }


  export type DistrictsAvgAggregateInputType = {
    id?: true
    election_id?: true
  }

  export type DistrictsSumAggregateInputType = {
    id?: true
    election_id?: true
  }

  export type DistrictsMinAggregateInputType = {
    id?: true
    election_id?: true
    name?: true
    description?: true
    created_at?: true
  }

  export type DistrictsMaxAggregateInputType = {
    id?: true
    election_id?: true
    name?: true
    description?: true
    created_at?: true
  }

  export type DistrictsCountAggregateInputType = {
    id?: true
    election_id?: true
    name?: true
    description?: true
    created_at?: true
    _all?: true
  }

  export type DistrictsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which districts to aggregate.
     */
    where?: districtsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of districts to fetch.
     */
    orderBy?: districtsOrderByWithRelationInput | districtsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: districtsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` districts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` districts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned districts
    **/
    _count?: true | DistrictsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DistrictsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DistrictsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DistrictsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DistrictsMaxAggregateInputType
  }

  export type GetDistrictsAggregateType<T extends DistrictsAggregateArgs> = {
        [P in keyof T & keyof AggregateDistricts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDistricts[P]>
      : GetScalarType<T[P], AggregateDistricts[P]>
  }




  export type districtsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: districtsWhereInput
    orderBy?: districtsOrderByWithAggregationInput | districtsOrderByWithAggregationInput[]
    by: DistrictsScalarFieldEnum[] | DistrictsScalarFieldEnum
    having?: districtsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DistrictsCountAggregateInputType | true
    _avg?: DistrictsAvgAggregateInputType
    _sum?: DistrictsSumAggregateInputType
    _min?: DistrictsMinAggregateInputType
    _max?: DistrictsMaxAggregateInputType
  }

  export type DistrictsGroupByOutputType = {
    id: bigint
    election_id: bigint
    name: string
    description: string | null
    created_at: Date | null
    _count: DistrictsCountAggregateOutputType | null
    _avg: DistrictsAvgAggregateOutputType | null
    _sum: DistrictsSumAggregateOutputType | null
    _min: DistrictsMinAggregateOutputType | null
    _max: DistrictsMaxAggregateOutputType | null
  }

  type GetDistrictsGroupByPayload<T extends districtsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DistrictsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DistrictsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DistrictsGroupByOutputType[P]>
            : GetScalarType<T[P], DistrictsGroupByOutputType[P]>
        }
      >
    >


  export type districtsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    election_id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    candidates?: boolean | districts$candidatesArgs<ExtArgs>
    elections?: boolean | electionsDefaultArgs<ExtArgs>
    voters?: boolean | districts$votersArgs<ExtArgs>
    _count?: boolean | DistrictsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["districts"]>



  export type districtsSelectScalar = {
    id?: boolean
    election_id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
  }

  export type districtsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "election_id" | "name" | "description" | "created_at", ExtArgs["result"]["districts"]>
  export type districtsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | districts$candidatesArgs<ExtArgs>
    elections?: boolean | electionsDefaultArgs<ExtArgs>
    voters?: boolean | districts$votersArgs<ExtArgs>
    _count?: boolean | DistrictsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $districtsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "districts"
    objects: {
      candidates: Prisma.$candidatesPayload<ExtArgs>[]
      elections: Prisma.$electionsPayload<ExtArgs>
      voters: Prisma.$votersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      election_id: bigint
      name: string
      description: string | null
      created_at: Date | null
    }, ExtArgs["result"]["districts"]>
    composites: {}
  }

  type districtsGetPayload<S extends boolean | null | undefined | districtsDefaultArgs> = $Result.GetResult<Prisma.$districtsPayload, S>

  type districtsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<districtsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DistrictsCountAggregateInputType | true
    }

  export interface districtsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['districts'], meta: { name: 'districts' } }
    /**
     * Find zero or one Districts that matches the filter.
     * @param {districtsFindUniqueArgs} args - Arguments to find a Districts
     * @example
     * // Get one Districts
     * const districts = await prisma.districts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends districtsFindUniqueArgs>(args: SelectSubset<T, districtsFindUniqueArgs<ExtArgs>>): Prisma__districtsClient<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Districts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {districtsFindUniqueOrThrowArgs} args - Arguments to find a Districts
     * @example
     * // Get one Districts
     * const districts = await prisma.districts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends districtsFindUniqueOrThrowArgs>(args: SelectSubset<T, districtsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__districtsClient<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Districts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {districtsFindFirstArgs} args - Arguments to find a Districts
     * @example
     * // Get one Districts
     * const districts = await prisma.districts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends districtsFindFirstArgs>(args?: SelectSubset<T, districtsFindFirstArgs<ExtArgs>>): Prisma__districtsClient<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Districts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {districtsFindFirstOrThrowArgs} args - Arguments to find a Districts
     * @example
     * // Get one Districts
     * const districts = await prisma.districts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends districtsFindFirstOrThrowArgs>(args?: SelectSubset<T, districtsFindFirstOrThrowArgs<ExtArgs>>): Prisma__districtsClient<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Districts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {districtsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Districts
     * const districts = await prisma.districts.findMany()
     * 
     * // Get first 10 Districts
     * const districts = await prisma.districts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const districtsWithIdOnly = await prisma.districts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends districtsFindManyArgs>(args?: SelectSubset<T, districtsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Districts.
     * @param {districtsCreateArgs} args - Arguments to create a Districts.
     * @example
     * // Create one Districts
     * const Districts = await prisma.districts.create({
     *   data: {
     *     // ... data to create a Districts
     *   }
     * })
     * 
     */
    create<T extends districtsCreateArgs>(args: SelectSubset<T, districtsCreateArgs<ExtArgs>>): Prisma__districtsClient<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Districts.
     * @param {districtsCreateManyArgs} args - Arguments to create many Districts.
     * @example
     * // Create many Districts
     * const districts = await prisma.districts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends districtsCreateManyArgs>(args?: SelectSubset<T, districtsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Districts.
     * @param {districtsDeleteArgs} args - Arguments to delete one Districts.
     * @example
     * // Delete one Districts
     * const Districts = await prisma.districts.delete({
     *   where: {
     *     // ... filter to delete one Districts
     *   }
     * })
     * 
     */
    delete<T extends districtsDeleteArgs>(args: SelectSubset<T, districtsDeleteArgs<ExtArgs>>): Prisma__districtsClient<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Districts.
     * @param {districtsUpdateArgs} args - Arguments to update one Districts.
     * @example
     * // Update one Districts
     * const districts = await prisma.districts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends districtsUpdateArgs>(args: SelectSubset<T, districtsUpdateArgs<ExtArgs>>): Prisma__districtsClient<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Districts.
     * @param {districtsDeleteManyArgs} args - Arguments to filter Districts to delete.
     * @example
     * // Delete a few Districts
     * const { count } = await prisma.districts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends districtsDeleteManyArgs>(args?: SelectSubset<T, districtsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Districts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {districtsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Districts
     * const districts = await prisma.districts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends districtsUpdateManyArgs>(args: SelectSubset<T, districtsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Districts.
     * @param {districtsUpsertArgs} args - Arguments to update or create a Districts.
     * @example
     * // Update or create a Districts
     * const districts = await prisma.districts.upsert({
     *   create: {
     *     // ... data to create a Districts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Districts we want to update
     *   }
     * })
     */
    upsert<T extends districtsUpsertArgs>(args: SelectSubset<T, districtsUpsertArgs<ExtArgs>>): Prisma__districtsClient<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Districts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {districtsCountArgs} args - Arguments to filter Districts to count.
     * @example
     * // Count the number of Districts
     * const count = await prisma.districts.count({
     *   where: {
     *     // ... the filter for the Districts we want to count
     *   }
     * })
    **/
    count<T extends districtsCountArgs>(
      args?: Subset<T, districtsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DistrictsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Districts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistrictsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DistrictsAggregateArgs>(args: Subset<T, DistrictsAggregateArgs>): Prisma.PrismaPromise<GetDistrictsAggregateType<T>>

    /**
     * Group by Districts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {districtsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends districtsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: districtsGroupByArgs['orderBy'] }
        : { orderBy?: districtsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, districtsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDistrictsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the districts model
   */
  readonly fields: districtsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for districts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__districtsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidates<T extends districts$candidatesArgs<ExtArgs> = {}>(args?: Subset<T, districts$candidatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    elections<T extends electionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, electionsDefaultArgs<ExtArgs>>): Prisma__electionsClient<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    voters<T extends districts$votersArgs<ExtArgs> = {}>(args?: Subset<T, districts$votersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$votersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the districts model
   */
  interface districtsFieldRefs {
    readonly id: FieldRef<"districts", 'BigInt'>
    readonly election_id: FieldRef<"districts", 'BigInt'>
    readonly name: FieldRef<"districts", 'String'>
    readonly description: FieldRef<"districts", 'String'>
    readonly created_at: FieldRef<"districts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * districts findUnique
   */
  export type districtsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
    /**
     * Filter, which districts to fetch.
     */
    where: districtsWhereUniqueInput
  }

  /**
   * districts findUniqueOrThrow
   */
  export type districtsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
    /**
     * Filter, which districts to fetch.
     */
    where: districtsWhereUniqueInput
  }

  /**
   * districts findFirst
   */
  export type districtsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
    /**
     * Filter, which districts to fetch.
     */
    where?: districtsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of districts to fetch.
     */
    orderBy?: districtsOrderByWithRelationInput | districtsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for districts.
     */
    cursor?: districtsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` districts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` districts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of districts.
     */
    distinct?: DistrictsScalarFieldEnum | DistrictsScalarFieldEnum[]
  }

  /**
   * districts findFirstOrThrow
   */
  export type districtsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
    /**
     * Filter, which districts to fetch.
     */
    where?: districtsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of districts to fetch.
     */
    orderBy?: districtsOrderByWithRelationInput | districtsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for districts.
     */
    cursor?: districtsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` districts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` districts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of districts.
     */
    distinct?: DistrictsScalarFieldEnum | DistrictsScalarFieldEnum[]
  }

  /**
   * districts findMany
   */
  export type districtsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
    /**
     * Filter, which districts to fetch.
     */
    where?: districtsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of districts to fetch.
     */
    orderBy?: districtsOrderByWithRelationInput | districtsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing districts.
     */
    cursor?: districtsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` districts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` districts.
     */
    skip?: number
    distinct?: DistrictsScalarFieldEnum | DistrictsScalarFieldEnum[]
  }

  /**
   * districts create
   */
  export type districtsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
    /**
     * The data needed to create a districts.
     */
    data: XOR<districtsCreateInput, districtsUncheckedCreateInput>
  }

  /**
   * districts createMany
   */
  export type districtsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many districts.
     */
    data: districtsCreateManyInput | districtsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * districts update
   */
  export type districtsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
    /**
     * The data needed to update a districts.
     */
    data: XOR<districtsUpdateInput, districtsUncheckedUpdateInput>
    /**
     * Choose, which districts to update.
     */
    where: districtsWhereUniqueInput
  }

  /**
   * districts updateMany
   */
  export type districtsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update districts.
     */
    data: XOR<districtsUpdateManyMutationInput, districtsUncheckedUpdateManyInput>
    /**
     * Filter which districts to update
     */
    where?: districtsWhereInput
    /**
     * Limit how many districts to update.
     */
    limit?: number
  }

  /**
   * districts upsert
   */
  export type districtsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
    /**
     * The filter to search for the districts to update in case it exists.
     */
    where: districtsWhereUniqueInput
    /**
     * In case the districts found by the `where` argument doesn't exist, create a new districts with this data.
     */
    create: XOR<districtsCreateInput, districtsUncheckedCreateInput>
    /**
     * In case the districts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<districtsUpdateInput, districtsUncheckedUpdateInput>
  }

  /**
   * districts delete
   */
  export type districtsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
    /**
     * Filter which districts to delete.
     */
    where: districtsWhereUniqueInput
  }

  /**
   * districts deleteMany
   */
  export type districtsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which districts to delete
     */
    where?: districtsWhereInput
    /**
     * Limit how many districts to delete.
     */
    limit?: number
  }

  /**
   * districts.candidates
   */
  export type districts$candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    where?: candidatesWhereInput
    orderBy?: candidatesOrderByWithRelationInput | candidatesOrderByWithRelationInput[]
    cursor?: candidatesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CandidatesScalarFieldEnum | CandidatesScalarFieldEnum[]
  }

  /**
   * districts.voters
   */
  export type districts$votersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
    where?: votersWhereInput
    orderBy?: votersOrderByWithRelationInput | votersOrderByWithRelationInput[]
    cursor?: votersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VotersScalarFieldEnum | VotersScalarFieldEnum[]
  }

  /**
   * districts without action
   */
  export type districtsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
  }


  /**
   * Model elections
   */

  export type AggregateElections = {
    _count: ElectionsCountAggregateOutputType | null
    _avg: ElectionsAvgAggregateOutputType | null
    _sum: ElectionsSumAggregateOutputType | null
    _min: ElectionsMinAggregateOutputType | null
    _max: ElectionsMaxAggregateOutputType | null
  }

  export type ElectionsAvgAggregateOutputType = {
    id: number | null
    created_by: number | null
  }

  export type ElectionsSumAggregateOutputType = {
    id: bigint | null
    created_by: bigint | null
  }

  export type ElectionsMinAggregateOutputType = {
    id: bigint | null
    title: string | null
    description: string | null
    start_date: Date | null
    end_date: Date | null
    status: $Enums.elections_status | null
    contract_address: string | null
    created_by: bigint | null
    created_at: Date | null
  }

  export type ElectionsMaxAggregateOutputType = {
    id: bigint | null
    title: string | null
    description: string | null
    start_date: Date | null
    end_date: Date | null
    status: $Enums.elections_status | null
    contract_address: string | null
    created_by: bigint | null
    created_at: Date | null
  }

  export type ElectionsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    start_date: number
    end_date: number
    status: number
    contract_address: number
    created_by: number
    created_at: number
    _all: number
  }


  export type ElectionsAvgAggregateInputType = {
    id?: true
    created_by?: true
  }

  export type ElectionsSumAggregateInputType = {
    id?: true
    created_by?: true
  }

  export type ElectionsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    start_date?: true
    end_date?: true
    status?: true
    contract_address?: true
    created_by?: true
    created_at?: true
  }

  export type ElectionsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    start_date?: true
    end_date?: true
    status?: true
    contract_address?: true
    created_by?: true
    created_at?: true
  }

  export type ElectionsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    start_date?: true
    end_date?: true
    status?: true
    contract_address?: true
    created_by?: true
    created_at?: true
    _all?: true
  }

  export type ElectionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which elections to aggregate.
     */
    where?: electionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of elections to fetch.
     */
    orderBy?: electionsOrderByWithRelationInput | electionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: electionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` elections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned elections
    **/
    _count?: true | ElectionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElectionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElectionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElectionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElectionsMaxAggregateInputType
  }

  export type GetElectionsAggregateType<T extends ElectionsAggregateArgs> = {
        [P in keyof T & keyof AggregateElections]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElections[P]>
      : GetScalarType<T[P], AggregateElections[P]>
  }




  export type electionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: electionsWhereInput
    orderBy?: electionsOrderByWithAggregationInput | electionsOrderByWithAggregationInput[]
    by: ElectionsScalarFieldEnum[] | ElectionsScalarFieldEnum
    having?: electionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElectionsCountAggregateInputType | true
    _avg?: ElectionsAvgAggregateInputType
    _sum?: ElectionsSumAggregateInputType
    _min?: ElectionsMinAggregateInputType
    _max?: ElectionsMaxAggregateInputType
  }

  export type ElectionsGroupByOutputType = {
    id: bigint
    title: string
    description: string | null
    start_date: Date | null
    end_date: Date | null
    status: $Enums.elections_status | null
    contract_address: string | null
    created_by: bigint | null
    created_at: Date | null
    _count: ElectionsCountAggregateOutputType | null
    _avg: ElectionsAvgAggregateOutputType | null
    _sum: ElectionsSumAggregateOutputType | null
    _min: ElectionsMinAggregateOutputType | null
    _max: ElectionsMaxAggregateOutputType | null
  }

  type GetElectionsGroupByPayload<T extends electionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElectionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElectionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElectionsGroupByOutputType[P]>
            : GetScalarType<T[P], ElectionsGroupByOutputType[P]>
        }
      >
    >


  export type electionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    start_date?: boolean
    end_date?: boolean
    status?: boolean
    contract_address?: boolean
    created_by?: boolean
    created_at?: boolean
    candidates?: boolean | elections$candidatesArgs<ExtArgs>
    districts?: boolean | elections$districtsArgs<ExtArgs>
    users?: boolean | elections$usersArgs<ExtArgs>
    voters?: boolean | elections$votersArgs<ExtArgs>
    _count?: boolean | ElectionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["elections"]>



  export type electionsSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    start_date?: boolean
    end_date?: boolean
    status?: boolean
    contract_address?: boolean
    created_by?: boolean
    created_at?: boolean
  }

  export type electionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "start_date" | "end_date" | "status" | "contract_address" | "created_by" | "created_at", ExtArgs["result"]["elections"]>
  export type electionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | elections$candidatesArgs<ExtArgs>
    districts?: boolean | elections$districtsArgs<ExtArgs>
    users?: boolean | elections$usersArgs<ExtArgs>
    voters?: boolean | elections$votersArgs<ExtArgs>
    _count?: boolean | ElectionsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $electionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "elections"
    objects: {
      candidates: Prisma.$candidatesPayload<ExtArgs>[]
      districts: Prisma.$districtsPayload<ExtArgs>[]
      users: Prisma.$usersPayload<ExtArgs> | null
      voters: Prisma.$votersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      title: string
      description: string | null
      start_date: Date | null
      end_date: Date | null
      status: $Enums.elections_status | null
      contract_address: string | null
      created_by: bigint | null
      created_at: Date | null
    }, ExtArgs["result"]["elections"]>
    composites: {}
  }

  type electionsGetPayload<S extends boolean | null | undefined | electionsDefaultArgs> = $Result.GetResult<Prisma.$electionsPayload, S>

  type electionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<electionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElectionsCountAggregateInputType | true
    }

  export interface electionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['elections'], meta: { name: 'elections' } }
    /**
     * Find zero or one Elections that matches the filter.
     * @param {electionsFindUniqueArgs} args - Arguments to find a Elections
     * @example
     * // Get one Elections
     * const elections = await prisma.elections.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends electionsFindUniqueArgs>(args: SelectSubset<T, electionsFindUniqueArgs<ExtArgs>>): Prisma__electionsClient<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Elections that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {electionsFindUniqueOrThrowArgs} args - Arguments to find a Elections
     * @example
     * // Get one Elections
     * const elections = await prisma.elections.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends electionsFindUniqueOrThrowArgs>(args: SelectSubset<T, electionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__electionsClient<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Elections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionsFindFirstArgs} args - Arguments to find a Elections
     * @example
     * // Get one Elections
     * const elections = await prisma.elections.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends electionsFindFirstArgs>(args?: SelectSubset<T, electionsFindFirstArgs<ExtArgs>>): Prisma__electionsClient<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Elections that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionsFindFirstOrThrowArgs} args - Arguments to find a Elections
     * @example
     * // Get one Elections
     * const elections = await prisma.elections.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends electionsFindFirstOrThrowArgs>(args?: SelectSubset<T, electionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__electionsClient<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Elections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Elections
     * const elections = await prisma.elections.findMany()
     * 
     * // Get first 10 Elections
     * const elections = await prisma.elections.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const electionsWithIdOnly = await prisma.elections.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends electionsFindManyArgs>(args?: SelectSubset<T, electionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Elections.
     * @param {electionsCreateArgs} args - Arguments to create a Elections.
     * @example
     * // Create one Elections
     * const Elections = await prisma.elections.create({
     *   data: {
     *     // ... data to create a Elections
     *   }
     * })
     * 
     */
    create<T extends electionsCreateArgs>(args: SelectSubset<T, electionsCreateArgs<ExtArgs>>): Prisma__electionsClient<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Elections.
     * @param {electionsCreateManyArgs} args - Arguments to create many Elections.
     * @example
     * // Create many Elections
     * const elections = await prisma.elections.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends electionsCreateManyArgs>(args?: SelectSubset<T, electionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Elections.
     * @param {electionsDeleteArgs} args - Arguments to delete one Elections.
     * @example
     * // Delete one Elections
     * const Elections = await prisma.elections.delete({
     *   where: {
     *     // ... filter to delete one Elections
     *   }
     * })
     * 
     */
    delete<T extends electionsDeleteArgs>(args: SelectSubset<T, electionsDeleteArgs<ExtArgs>>): Prisma__electionsClient<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Elections.
     * @param {electionsUpdateArgs} args - Arguments to update one Elections.
     * @example
     * // Update one Elections
     * const elections = await prisma.elections.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends electionsUpdateArgs>(args: SelectSubset<T, electionsUpdateArgs<ExtArgs>>): Prisma__electionsClient<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Elections.
     * @param {electionsDeleteManyArgs} args - Arguments to filter Elections to delete.
     * @example
     * // Delete a few Elections
     * const { count } = await prisma.elections.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends electionsDeleteManyArgs>(args?: SelectSubset<T, electionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Elections
     * const elections = await prisma.elections.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends electionsUpdateManyArgs>(args: SelectSubset<T, electionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Elections.
     * @param {electionsUpsertArgs} args - Arguments to update or create a Elections.
     * @example
     * // Update or create a Elections
     * const elections = await prisma.elections.upsert({
     *   create: {
     *     // ... data to create a Elections
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Elections we want to update
     *   }
     * })
     */
    upsert<T extends electionsUpsertArgs>(args: SelectSubset<T, electionsUpsertArgs<ExtArgs>>): Prisma__electionsClient<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Elections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionsCountArgs} args - Arguments to filter Elections to count.
     * @example
     * // Count the number of Elections
     * const count = await prisma.elections.count({
     *   where: {
     *     // ... the filter for the Elections we want to count
     *   }
     * })
    **/
    count<T extends electionsCountArgs>(
      args?: Subset<T, electionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElectionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Elections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElectionsAggregateArgs>(args: Subset<T, ElectionsAggregateArgs>): Prisma.PrismaPromise<GetElectionsAggregateType<T>>

    /**
     * Group by Elections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends electionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: electionsGroupByArgs['orderBy'] }
        : { orderBy?: electionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, electionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElectionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the elections model
   */
  readonly fields: electionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for elections.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__electionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidates<T extends elections$candidatesArgs<ExtArgs> = {}>(args?: Subset<T, elections$candidatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    districts<T extends elections$districtsArgs<ExtArgs> = {}>(args?: Subset<T, elections$districtsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends elections$usersArgs<ExtArgs> = {}>(args?: Subset<T, elections$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    voters<T extends elections$votersArgs<ExtArgs> = {}>(args?: Subset<T, elections$votersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$votersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the elections model
   */
  interface electionsFieldRefs {
    readonly id: FieldRef<"elections", 'BigInt'>
    readonly title: FieldRef<"elections", 'String'>
    readonly description: FieldRef<"elections", 'String'>
    readonly start_date: FieldRef<"elections", 'DateTime'>
    readonly end_date: FieldRef<"elections", 'DateTime'>
    readonly status: FieldRef<"elections", 'elections_status'>
    readonly contract_address: FieldRef<"elections", 'String'>
    readonly created_by: FieldRef<"elections", 'BigInt'>
    readonly created_at: FieldRef<"elections", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * elections findUnique
   */
  export type electionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the elections
     */
    select?: electionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the elections
     */
    omit?: electionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionsInclude<ExtArgs> | null
    /**
     * Filter, which elections to fetch.
     */
    where: electionsWhereUniqueInput
  }

  /**
   * elections findUniqueOrThrow
   */
  export type electionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the elections
     */
    select?: electionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the elections
     */
    omit?: electionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionsInclude<ExtArgs> | null
    /**
     * Filter, which elections to fetch.
     */
    where: electionsWhereUniqueInput
  }

  /**
   * elections findFirst
   */
  export type electionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the elections
     */
    select?: electionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the elections
     */
    omit?: electionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionsInclude<ExtArgs> | null
    /**
     * Filter, which elections to fetch.
     */
    where?: electionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of elections to fetch.
     */
    orderBy?: electionsOrderByWithRelationInput | electionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for elections.
     */
    cursor?: electionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` elections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of elections.
     */
    distinct?: ElectionsScalarFieldEnum | ElectionsScalarFieldEnum[]
  }

  /**
   * elections findFirstOrThrow
   */
  export type electionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the elections
     */
    select?: electionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the elections
     */
    omit?: electionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionsInclude<ExtArgs> | null
    /**
     * Filter, which elections to fetch.
     */
    where?: electionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of elections to fetch.
     */
    orderBy?: electionsOrderByWithRelationInput | electionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for elections.
     */
    cursor?: electionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` elections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of elections.
     */
    distinct?: ElectionsScalarFieldEnum | ElectionsScalarFieldEnum[]
  }

  /**
   * elections findMany
   */
  export type electionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the elections
     */
    select?: electionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the elections
     */
    omit?: electionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionsInclude<ExtArgs> | null
    /**
     * Filter, which elections to fetch.
     */
    where?: electionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of elections to fetch.
     */
    orderBy?: electionsOrderByWithRelationInput | electionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing elections.
     */
    cursor?: electionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` elections.
     */
    skip?: number
    distinct?: ElectionsScalarFieldEnum | ElectionsScalarFieldEnum[]
  }

  /**
   * elections create
   */
  export type electionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the elections
     */
    select?: electionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the elections
     */
    omit?: electionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionsInclude<ExtArgs> | null
    /**
     * The data needed to create a elections.
     */
    data: XOR<electionsCreateInput, electionsUncheckedCreateInput>
  }

  /**
   * elections createMany
   */
  export type electionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many elections.
     */
    data: electionsCreateManyInput | electionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * elections update
   */
  export type electionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the elections
     */
    select?: electionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the elections
     */
    omit?: electionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionsInclude<ExtArgs> | null
    /**
     * The data needed to update a elections.
     */
    data: XOR<electionsUpdateInput, electionsUncheckedUpdateInput>
    /**
     * Choose, which elections to update.
     */
    where: electionsWhereUniqueInput
  }

  /**
   * elections updateMany
   */
  export type electionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update elections.
     */
    data: XOR<electionsUpdateManyMutationInput, electionsUncheckedUpdateManyInput>
    /**
     * Filter which elections to update
     */
    where?: electionsWhereInput
    /**
     * Limit how many elections to update.
     */
    limit?: number
  }

  /**
   * elections upsert
   */
  export type electionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the elections
     */
    select?: electionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the elections
     */
    omit?: electionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionsInclude<ExtArgs> | null
    /**
     * The filter to search for the elections to update in case it exists.
     */
    where: electionsWhereUniqueInput
    /**
     * In case the elections found by the `where` argument doesn't exist, create a new elections with this data.
     */
    create: XOR<electionsCreateInput, electionsUncheckedCreateInput>
    /**
     * In case the elections was found with the provided `where` argument, update it with this data.
     */
    update: XOR<electionsUpdateInput, electionsUncheckedUpdateInput>
  }

  /**
   * elections delete
   */
  export type electionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the elections
     */
    select?: electionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the elections
     */
    omit?: electionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionsInclude<ExtArgs> | null
    /**
     * Filter which elections to delete.
     */
    where: electionsWhereUniqueInput
  }

  /**
   * elections deleteMany
   */
  export type electionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which elections to delete
     */
    where?: electionsWhereInput
    /**
     * Limit how many elections to delete.
     */
    limit?: number
  }

  /**
   * elections.candidates
   */
  export type elections$candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    where?: candidatesWhereInput
    orderBy?: candidatesOrderByWithRelationInput | candidatesOrderByWithRelationInput[]
    cursor?: candidatesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CandidatesScalarFieldEnum | CandidatesScalarFieldEnum[]
  }

  /**
   * elections.districts
   */
  export type elections$districtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
    where?: districtsWhereInput
    orderBy?: districtsOrderByWithRelationInput | districtsOrderByWithRelationInput[]
    cursor?: districtsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DistrictsScalarFieldEnum | DistrictsScalarFieldEnum[]
  }

  /**
   * elections.users
   */
  export type elections$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * elections.voters
   */
  export type elections$votersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
    where?: votersWhereInput
    orderBy?: votersOrderByWithRelationInput | votersOrderByWithRelationInput[]
    cursor?: votersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VotersScalarFieldEnum | VotersScalarFieldEnum[]
  }

  /**
   * elections without action
   */
  export type electionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the elections
     */
    select?: electionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the elections
     */
    omit?: electionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionsInclude<ExtArgs> | null
  }


  /**
   * Model parties
   */

  export type AggregateParties = {
    _count: PartiesCountAggregateOutputType | null
    _avg: PartiesAvgAggregateOutputType | null
    _sum: PartiesSumAggregateOutputType | null
    _min: PartiesMinAggregateOutputType | null
    _max: PartiesMaxAggregateOutputType | null
  }

  export type PartiesAvgAggregateOutputType = {
    id: number | null
  }

  export type PartiesSumAggregateOutputType = {
    id: bigint | null
  }

  export type PartiesMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    abbreviation: string | null
    logo_url: string | null
    created_at: Date | null
  }

  export type PartiesMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    abbreviation: string | null
    logo_url: string | null
    created_at: Date | null
  }

  export type PartiesCountAggregateOutputType = {
    id: number
    name: number
    abbreviation: number
    logo_url: number
    created_at: number
    _all: number
  }


  export type PartiesAvgAggregateInputType = {
    id?: true
  }

  export type PartiesSumAggregateInputType = {
    id?: true
  }

  export type PartiesMinAggregateInputType = {
    id?: true
    name?: true
    abbreviation?: true
    logo_url?: true
    created_at?: true
  }

  export type PartiesMaxAggregateInputType = {
    id?: true
    name?: true
    abbreviation?: true
    logo_url?: true
    created_at?: true
  }

  export type PartiesCountAggregateInputType = {
    id?: true
    name?: true
    abbreviation?: true
    logo_url?: true
    created_at?: true
    _all?: true
  }

  export type PartiesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which parties to aggregate.
     */
    where?: partiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of parties to fetch.
     */
    orderBy?: partiesOrderByWithRelationInput | partiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: partiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` parties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` parties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned parties
    **/
    _count?: true | PartiesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartiesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartiesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartiesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartiesMaxAggregateInputType
  }

  export type GetPartiesAggregateType<T extends PartiesAggregateArgs> = {
        [P in keyof T & keyof AggregateParties]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParties[P]>
      : GetScalarType<T[P], AggregateParties[P]>
  }




  export type partiesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: partiesWhereInput
    orderBy?: partiesOrderByWithAggregationInput | partiesOrderByWithAggregationInput[]
    by: PartiesScalarFieldEnum[] | PartiesScalarFieldEnum
    having?: partiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartiesCountAggregateInputType | true
    _avg?: PartiesAvgAggregateInputType
    _sum?: PartiesSumAggregateInputType
    _min?: PartiesMinAggregateInputType
    _max?: PartiesMaxAggregateInputType
  }

  export type PartiesGroupByOutputType = {
    id: bigint
    name: string
    abbreviation: string | null
    logo_url: string | null
    created_at: Date | null
    _count: PartiesCountAggregateOutputType | null
    _avg: PartiesAvgAggregateOutputType | null
    _sum: PartiesSumAggregateOutputType | null
    _min: PartiesMinAggregateOutputType | null
    _max: PartiesMaxAggregateOutputType | null
  }

  type GetPartiesGroupByPayload<T extends partiesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartiesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartiesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartiesGroupByOutputType[P]>
            : GetScalarType<T[P], PartiesGroupByOutputType[P]>
        }
      >
    >


  export type partiesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    abbreviation?: boolean
    logo_url?: boolean
    created_at?: boolean
    candidates?: boolean | parties$candidatesArgs<ExtArgs>
    _count?: boolean | PartiesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parties"]>



  export type partiesSelectScalar = {
    id?: boolean
    name?: boolean
    abbreviation?: boolean
    logo_url?: boolean
    created_at?: boolean
  }

  export type partiesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "abbreviation" | "logo_url" | "created_at", ExtArgs["result"]["parties"]>
  export type partiesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | parties$candidatesArgs<ExtArgs>
    _count?: boolean | PartiesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $partiesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "parties"
    objects: {
      candidates: Prisma.$candidatesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      abbreviation: string | null
      logo_url: string | null
      created_at: Date | null
    }, ExtArgs["result"]["parties"]>
    composites: {}
  }

  type partiesGetPayload<S extends boolean | null | undefined | partiesDefaultArgs> = $Result.GetResult<Prisma.$partiesPayload, S>

  type partiesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<partiesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartiesCountAggregateInputType | true
    }

  export interface partiesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['parties'], meta: { name: 'parties' } }
    /**
     * Find zero or one Parties that matches the filter.
     * @param {partiesFindUniqueArgs} args - Arguments to find a Parties
     * @example
     * // Get one Parties
     * const parties = await prisma.parties.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends partiesFindUniqueArgs>(args: SelectSubset<T, partiesFindUniqueArgs<ExtArgs>>): Prisma__partiesClient<$Result.GetResult<Prisma.$partiesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Parties that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {partiesFindUniqueOrThrowArgs} args - Arguments to find a Parties
     * @example
     * // Get one Parties
     * const parties = await prisma.parties.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends partiesFindUniqueOrThrowArgs>(args: SelectSubset<T, partiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__partiesClient<$Result.GetResult<Prisma.$partiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {partiesFindFirstArgs} args - Arguments to find a Parties
     * @example
     * // Get one Parties
     * const parties = await prisma.parties.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends partiesFindFirstArgs>(args?: SelectSubset<T, partiesFindFirstArgs<ExtArgs>>): Prisma__partiesClient<$Result.GetResult<Prisma.$partiesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parties that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {partiesFindFirstOrThrowArgs} args - Arguments to find a Parties
     * @example
     * // Get one Parties
     * const parties = await prisma.parties.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends partiesFindFirstOrThrowArgs>(args?: SelectSubset<T, partiesFindFirstOrThrowArgs<ExtArgs>>): Prisma__partiesClient<$Result.GetResult<Prisma.$partiesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {partiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parties
     * const parties = await prisma.parties.findMany()
     * 
     * // Get first 10 Parties
     * const parties = await prisma.parties.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partiesWithIdOnly = await prisma.parties.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends partiesFindManyArgs>(args?: SelectSubset<T, partiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$partiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Parties.
     * @param {partiesCreateArgs} args - Arguments to create a Parties.
     * @example
     * // Create one Parties
     * const Parties = await prisma.parties.create({
     *   data: {
     *     // ... data to create a Parties
     *   }
     * })
     * 
     */
    create<T extends partiesCreateArgs>(args: SelectSubset<T, partiesCreateArgs<ExtArgs>>): Prisma__partiesClient<$Result.GetResult<Prisma.$partiesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parties.
     * @param {partiesCreateManyArgs} args - Arguments to create many Parties.
     * @example
     * // Create many Parties
     * const parties = await prisma.parties.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends partiesCreateManyArgs>(args?: SelectSubset<T, partiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Parties.
     * @param {partiesDeleteArgs} args - Arguments to delete one Parties.
     * @example
     * // Delete one Parties
     * const Parties = await prisma.parties.delete({
     *   where: {
     *     // ... filter to delete one Parties
     *   }
     * })
     * 
     */
    delete<T extends partiesDeleteArgs>(args: SelectSubset<T, partiesDeleteArgs<ExtArgs>>): Prisma__partiesClient<$Result.GetResult<Prisma.$partiesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Parties.
     * @param {partiesUpdateArgs} args - Arguments to update one Parties.
     * @example
     * // Update one Parties
     * const parties = await prisma.parties.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends partiesUpdateArgs>(args: SelectSubset<T, partiesUpdateArgs<ExtArgs>>): Prisma__partiesClient<$Result.GetResult<Prisma.$partiesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parties.
     * @param {partiesDeleteManyArgs} args - Arguments to filter Parties to delete.
     * @example
     * // Delete a few Parties
     * const { count } = await prisma.parties.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends partiesDeleteManyArgs>(args?: SelectSubset<T, partiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {partiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parties
     * const parties = await prisma.parties.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends partiesUpdateManyArgs>(args: SelectSubset<T, partiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Parties.
     * @param {partiesUpsertArgs} args - Arguments to update or create a Parties.
     * @example
     * // Update or create a Parties
     * const parties = await prisma.parties.upsert({
     *   create: {
     *     // ... data to create a Parties
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Parties we want to update
     *   }
     * })
     */
    upsert<T extends partiesUpsertArgs>(args: SelectSubset<T, partiesUpsertArgs<ExtArgs>>): Prisma__partiesClient<$Result.GetResult<Prisma.$partiesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {partiesCountArgs} args - Arguments to filter Parties to count.
     * @example
     * // Count the number of Parties
     * const count = await prisma.parties.count({
     *   where: {
     *     // ... the filter for the Parties we want to count
     *   }
     * })
    **/
    count<T extends partiesCountArgs>(
      args?: Subset<T, partiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartiesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Parties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartiesAggregateArgs>(args: Subset<T, PartiesAggregateArgs>): Prisma.PrismaPromise<GetPartiesAggregateType<T>>

    /**
     * Group by Parties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {partiesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends partiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: partiesGroupByArgs['orderBy'] }
        : { orderBy?: partiesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, partiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartiesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the parties model
   */
  readonly fields: partiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for parties.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__partiesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidates<T extends parties$candidatesArgs<ExtArgs> = {}>(args?: Subset<T, parties$candidatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$candidatesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the parties model
   */
  interface partiesFieldRefs {
    readonly id: FieldRef<"parties", 'BigInt'>
    readonly name: FieldRef<"parties", 'String'>
    readonly abbreviation: FieldRef<"parties", 'String'>
    readonly logo_url: FieldRef<"parties", 'String'>
    readonly created_at: FieldRef<"parties", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * parties findUnique
   */
  export type partiesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the parties
     */
    select?: partiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the parties
     */
    omit?: partiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: partiesInclude<ExtArgs> | null
    /**
     * Filter, which parties to fetch.
     */
    where: partiesWhereUniqueInput
  }

  /**
   * parties findUniqueOrThrow
   */
  export type partiesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the parties
     */
    select?: partiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the parties
     */
    omit?: partiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: partiesInclude<ExtArgs> | null
    /**
     * Filter, which parties to fetch.
     */
    where: partiesWhereUniqueInput
  }

  /**
   * parties findFirst
   */
  export type partiesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the parties
     */
    select?: partiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the parties
     */
    omit?: partiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: partiesInclude<ExtArgs> | null
    /**
     * Filter, which parties to fetch.
     */
    where?: partiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of parties to fetch.
     */
    orderBy?: partiesOrderByWithRelationInput | partiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for parties.
     */
    cursor?: partiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` parties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` parties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of parties.
     */
    distinct?: PartiesScalarFieldEnum | PartiesScalarFieldEnum[]
  }

  /**
   * parties findFirstOrThrow
   */
  export type partiesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the parties
     */
    select?: partiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the parties
     */
    omit?: partiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: partiesInclude<ExtArgs> | null
    /**
     * Filter, which parties to fetch.
     */
    where?: partiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of parties to fetch.
     */
    orderBy?: partiesOrderByWithRelationInput | partiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for parties.
     */
    cursor?: partiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` parties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` parties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of parties.
     */
    distinct?: PartiesScalarFieldEnum | PartiesScalarFieldEnum[]
  }

  /**
   * parties findMany
   */
  export type partiesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the parties
     */
    select?: partiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the parties
     */
    omit?: partiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: partiesInclude<ExtArgs> | null
    /**
     * Filter, which parties to fetch.
     */
    where?: partiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of parties to fetch.
     */
    orderBy?: partiesOrderByWithRelationInput | partiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing parties.
     */
    cursor?: partiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` parties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` parties.
     */
    skip?: number
    distinct?: PartiesScalarFieldEnum | PartiesScalarFieldEnum[]
  }

  /**
   * parties create
   */
  export type partiesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the parties
     */
    select?: partiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the parties
     */
    omit?: partiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: partiesInclude<ExtArgs> | null
    /**
     * The data needed to create a parties.
     */
    data: XOR<partiesCreateInput, partiesUncheckedCreateInput>
  }

  /**
   * parties createMany
   */
  export type partiesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many parties.
     */
    data: partiesCreateManyInput | partiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * parties update
   */
  export type partiesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the parties
     */
    select?: partiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the parties
     */
    omit?: partiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: partiesInclude<ExtArgs> | null
    /**
     * The data needed to update a parties.
     */
    data: XOR<partiesUpdateInput, partiesUncheckedUpdateInput>
    /**
     * Choose, which parties to update.
     */
    where: partiesWhereUniqueInput
  }

  /**
   * parties updateMany
   */
  export type partiesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update parties.
     */
    data: XOR<partiesUpdateManyMutationInput, partiesUncheckedUpdateManyInput>
    /**
     * Filter which parties to update
     */
    where?: partiesWhereInput
    /**
     * Limit how many parties to update.
     */
    limit?: number
  }

  /**
   * parties upsert
   */
  export type partiesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the parties
     */
    select?: partiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the parties
     */
    omit?: partiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: partiesInclude<ExtArgs> | null
    /**
     * The filter to search for the parties to update in case it exists.
     */
    where: partiesWhereUniqueInput
    /**
     * In case the parties found by the `where` argument doesn't exist, create a new parties with this data.
     */
    create: XOR<partiesCreateInput, partiesUncheckedCreateInput>
    /**
     * In case the parties was found with the provided `where` argument, update it with this data.
     */
    update: XOR<partiesUpdateInput, partiesUncheckedUpdateInput>
  }

  /**
   * parties delete
   */
  export type partiesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the parties
     */
    select?: partiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the parties
     */
    omit?: partiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: partiesInclude<ExtArgs> | null
    /**
     * Filter which parties to delete.
     */
    where: partiesWhereUniqueInput
  }

  /**
   * parties deleteMany
   */
  export type partiesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which parties to delete
     */
    where?: partiesWhereInput
    /**
     * Limit how many parties to delete.
     */
    limit?: number
  }

  /**
   * parties.candidates
   */
  export type parties$candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the candidates
     */
    select?: candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the candidates
     */
    omit?: candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: candidatesInclude<ExtArgs> | null
    where?: candidatesWhereInput
    orderBy?: candidatesOrderByWithRelationInput | candidatesOrderByWithRelationInput[]
    cursor?: candidatesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CandidatesScalarFieldEnum | CandidatesScalarFieldEnum[]
  }

  /**
   * parties without action
   */
  export type partiesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the parties
     */
    select?: partiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the parties
     */
    omit?: partiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: partiesInclude<ExtArgs> | null
  }


  /**
   * Model voters
   */

  export type AggregateVoters = {
    _count: VotersCountAggregateOutputType | null
    _avg: VotersAvgAggregateOutputType | null
    _sum: VotersSumAggregateOutputType | null
    _min: VotersMinAggregateOutputType | null
    _max: VotersMaxAggregateOutputType | null
  }

  export type VotersAvgAggregateOutputType = {
    id: number | null
    election_id: number | null
    district_id: number | null
  }

  export type VotersSumAggregateOutputType = {
    id: bigint | null
    election_id: bigint | null
    district_id: bigint | null
  }

  export type VotersMinAggregateOutputType = {
    id: bigint | null
    election_id: bigint | null
    district_id: bigint | null
    voter_id: string | null
    name: string | null
    public_key: string | null
    data_encrypted: string | null
    is_verified: boolean | null
    created_at: Date | null
  }

  export type VotersMaxAggregateOutputType = {
    id: bigint | null
    election_id: bigint | null
    district_id: bigint | null
    voter_id: string | null
    name: string | null
    public_key: string | null
    data_encrypted: string | null
    is_verified: boolean | null
    created_at: Date | null
  }

  export type VotersCountAggregateOutputType = {
    id: number
    election_id: number
    district_id: number
    voter_id: number
    name: number
    public_key: number
    data_encrypted: number
    is_verified: number
    created_at: number
    _all: number
  }


  export type VotersAvgAggregateInputType = {
    id?: true
    election_id?: true
    district_id?: true
  }

  export type VotersSumAggregateInputType = {
    id?: true
    election_id?: true
    district_id?: true
  }

  export type VotersMinAggregateInputType = {
    id?: true
    election_id?: true
    district_id?: true
    voter_id?: true
    name?: true
    public_key?: true
    data_encrypted?: true
    is_verified?: true
    created_at?: true
  }

  export type VotersMaxAggregateInputType = {
    id?: true
    election_id?: true
    district_id?: true
    voter_id?: true
    name?: true
    public_key?: true
    data_encrypted?: true
    is_verified?: true
    created_at?: true
  }

  export type VotersCountAggregateInputType = {
    id?: true
    election_id?: true
    district_id?: true
    voter_id?: true
    name?: true
    public_key?: true
    data_encrypted?: true
    is_verified?: true
    created_at?: true
    _all?: true
  }

  export type VotersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which voters to aggregate.
     */
    where?: votersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voters to fetch.
     */
    orderBy?: votersOrderByWithRelationInput | votersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: votersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned voters
    **/
    _count?: true | VotersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VotersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VotersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VotersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VotersMaxAggregateInputType
  }

  export type GetVotersAggregateType<T extends VotersAggregateArgs> = {
        [P in keyof T & keyof AggregateVoters]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVoters[P]>
      : GetScalarType<T[P], AggregateVoters[P]>
  }




  export type votersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: votersWhereInput
    orderBy?: votersOrderByWithAggregationInput | votersOrderByWithAggregationInput[]
    by: VotersScalarFieldEnum[] | VotersScalarFieldEnum
    having?: votersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VotersCountAggregateInputType | true
    _avg?: VotersAvgAggregateInputType
    _sum?: VotersSumAggregateInputType
    _min?: VotersMinAggregateInputType
    _max?: VotersMaxAggregateInputType
  }

  export type VotersGroupByOutputType = {
    id: bigint
    election_id: bigint
    district_id: bigint | null
    voter_id: string
    name: string | null
    public_key: string | null
    data_encrypted: string | null
    is_verified: boolean | null
    created_at: Date | null
    _count: VotersCountAggregateOutputType | null
    _avg: VotersAvgAggregateOutputType | null
    _sum: VotersSumAggregateOutputType | null
    _min: VotersMinAggregateOutputType | null
    _max: VotersMaxAggregateOutputType | null
  }

  type GetVotersGroupByPayload<T extends votersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VotersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VotersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VotersGroupByOutputType[P]>
            : GetScalarType<T[P], VotersGroupByOutputType[P]>
        }
      >
    >


  export type votersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    election_id?: boolean
    district_id?: boolean
    voter_id?: boolean
    name?: boolean
    public_key?: boolean
    data_encrypted?: boolean
    is_verified?: boolean
    created_at?: boolean
    elections?: boolean | electionsDefaultArgs<ExtArgs>
    districts?: boolean | voters$districtsArgs<ExtArgs>
  }, ExtArgs["result"]["voters"]>



  export type votersSelectScalar = {
    id?: boolean
    election_id?: boolean
    district_id?: boolean
    voter_id?: boolean
    name?: boolean
    public_key?: boolean
    data_encrypted?: boolean
    is_verified?: boolean
    created_at?: boolean
  }

  export type votersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "election_id" | "district_id" | "voter_id" | "name" | "public_key" | "data_encrypted" | "is_verified" | "created_at", ExtArgs["result"]["voters"]>
  export type votersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elections?: boolean | electionsDefaultArgs<ExtArgs>
    districts?: boolean | voters$districtsArgs<ExtArgs>
  }

  export type $votersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "voters"
    objects: {
      elections: Prisma.$electionsPayload<ExtArgs>
      districts: Prisma.$districtsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      election_id: bigint
      district_id: bigint | null
      voter_id: string
      name: string | null
      public_key: string | null
      data_encrypted: string | null
      is_verified: boolean | null
      created_at: Date | null
    }, ExtArgs["result"]["voters"]>
    composites: {}
  }

  type votersGetPayload<S extends boolean | null | undefined | votersDefaultArgs> = $Result.GetResult<Prisma.$votersPayload, S>

  type votersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<votersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VotersCountAggregateInputType | true
    }

  export interface votersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['voters'], meta: { name: 'voters' } }
    /**
     * Find zero or one Voters that matches the filter.
     * @param {votersFindUniqueArgs} args - Arguments to find a Voters
     * @example
     * // Get one Voters
     * const voters = await prisma.voters.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends votersFindUniqueArgs>(args: SelectSubset<T, votersFindUniqueArgs<ExtArgs>>): Prisma__votersClient<$Result.GetResult<Prisma.$votersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Voters that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {votersFindUniqueOrThrowArgs} args - Arguments to find a Voters
     * @example
     * // Get one Voters
     * const voters = await prisma.voters.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends votersFindUniqueOrThrowArgs>(args: SelectSubset<T, votersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__votersClient<$Result.GetResult<Prisma.$votersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Voters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {votersFindFirstArgs} args - Arguments to find a Voters
     * @example
     * // Get one Voters
     * const voters = await prisma.voters.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends votersFindFirstArgs>(args?: SelectSubset<T, votersFindFirstArgs<ExtArgs>>): Prisma__votersClient<$Result.GetResult<Prisma.$votersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Voters that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {votersFindFirstOrThrowArgs} args - Arguments to find a Voters
     * @example
     * // Get one Voters
     * const voters = await prisma.voters.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends votersFindFirstOrThrowArgs>(args?: SelectSubset<T, votersFindFirstOrThrowArgs<ExtArgs>>): Prisma__votersClient<$Result.GetResult<Prisma.$votersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Voters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {votersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Voters
     * const voters = await prisma.voters.findMany()
     * 
     * // Get first 10 Voters
     * const voters = await prisma.voters.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const votersWithIdOnly = await prisma.voters.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends votersFindManyArgs>(args?: SelectSubset<T, votersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$votersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Voters.
     * @param {votersCreateArgs} args - Arguments to create a Voters.
     * @example
     * // Create one Voters
     * const Voters = await prisma.voters.create({
     *   data: {
     *     // ... data to create a Voters
     *   }
     * })
     * 
     */
    create<T extends votersCreateArgs>(args: SelectSubset<T, votersCreateArgs<ExtArgs>>): Prisma__votersClient<$Result.GetResult<Prisma.$votersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Voters.
     * @param {votersCreateManyArgs} args - Arguments to create many Voters.
     * @example
     * // Create many Voters
     * const voters = await prisma.voters.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends votersCreateManyArgs>(args?: SelectSubset<T, votersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Voters.
     * @param {votersDeleteArgs} args - Arguments to delete one Voters.
     * @example
     * // Delete one Voters
     * const Voters = await prisma.voters.delete({
     *   where: {
     *     // ... filter to delete one Voters
     *   }
     * })
     * 
     */
    delete<T extends votersDeleteArgs>(args: SelectSubset<T, votersDeleteArgs<ExtArgs>>): Prisma__votersClient<$Result.GetResult<Prisma.$votersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Voters.
     * @param {votersUpdateArgs} args - Arguments to update one Voters.
     * @example
     * // Update one Voters
     * const voters = await prisma.voters.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends votersUpdateArgs>(args: SelectSubset<T, votersUpdateArgs<ExtArgs>>): Prisma__votersClient<$Result.GetResult<Prisma.$votersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Voters.
     * @param {votersDeleteManyArgs} args - Arguments to filter Voters to delete.
     * @example
     * // Delete a few Voters
     * const { count } = await prisma.voters.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends votersDeleteManyArgs>(args?: SelectSubset<T, votersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Voters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {votersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Voters
     * const voters = await prisma.voters.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends votersUpdateManyArgs>(args: SelectSubset<T, votersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Voters.
     * @param {votersUpsertArgs} args - Arguments to update or create a Voters.
     * @example
     * // Update or create a Voters
     * const voters = await prisma.voters.upsert({
     *   create: {
     *     // ... data to create a Voters
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Voters we want to update
     *   }
     * })
     */
    upsert<T extends votersUpsertArgs>(args: SelectSubset<T, votersUpsertArgs<ExtArgs>>): Prisma__votersClient<$Result.GetResult<Prisma.$votersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Voters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {votersCountArgs} args - Arguments to filter Voters to count.
     * @example
     * // Count the number of Voters
     * const count = await prisma.voters.count({
     *   where: {
     *     // ... the filter for the Voters we want to count
     *   }
     * })
    **/
    count<T extends votersCountArgs>(
      args?: Subset<T, votersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VotersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Voters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VotersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VotersAggregateArgs>(args: Subset<T, VotersAggregateArgs>): Prisma.PrismaPromise<GetVotersAggregateType<T>>

    /**
     * Group by Voters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {votersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends votersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: votersGroupByArgs['orderBy'] }
        : { orderBy?: votersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, votersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVotersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the voters model
   */
  readonly fields: votersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for voters.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__votersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    elections<T extends electionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, electionsDefaultArgs<ExtArgs>>): Prisma__electionsClient<$Result.GetResult<Prisma.$electionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    districts<T extends voters$districtsArgs<ExtArgs> = {}>(args?: Subset<T, voters$districtsArgs<ExtArgs>>): Prisma__districtsClient<$Result.GetResult<Prisma.$districtsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the voters model
   */
  interface votersFieldRefs {
    readonly id: FieldRef<"voters", 'BigInt'>
    readonly election_id: FieldRef<"voters", 'BigInt'>
    readonly district_id: FieldRef<"voters", 'BigInt'>
    readonly voter_id: FieldRef<"voters", 'String'>
    readonly name: FieldRef<"voters", 'String'>
    readonly public_key: FieldRef<"voters", 'String'>
    readonly data_encrypted: FieldRef<"voters", 'String'>
    readonly is_verified: FieldRef<"voters", 'Boolean'>
    readonly created_at: FieldRef<"voters", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * voters findUnique
   */
  export type votersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
    /**
     * Filter, which voters to fetch.
     */
    where: votersWhereUniqueInput
  }

  /**
   * voters findUniqueOrThrow
   */
  export type votersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
    /**
     * Filter, which voters to fetch.
     */
    where: votersWhereUniqueInput
  }

  /**
   * voters findFirst
   */
  export type votersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
    /**
     * Filter, which voters to fetch.
     */
    where?: votersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voters to fetch.
     */
    orderBy?: votersOrderByWithRelationInput | votersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for voters.
     */
    cursor?: votersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of voters.
     */
    distinct?: VotersScalarFieldEnum | VotersScalarFieldEnum[]
  }

  /**
   * voters findFirstOrThrow
   */
  export type votersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
    /**
     * Filter, which voters to fetch.
     */
    where?: votersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voters to fetch.
     */
    orderBy?: votersOrderByWithRelationInput | votersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for voters.
     */
    cursor?: votersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of voters.
     */
    distinct?: VotersScalarFieldEnum | VotersScalarFieldEnum[]
  }

  /**
   * voters findMany
   */
  export type votersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
    /**
     * Filter, which voters to fetch.
     */
    where?: votersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of voters to fetch.
     */
    orderBy?: votersOrderByWithRelationInput | votersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing voters.
     */
    cursor?: votersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` voters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` voters.
     */
    skip?: number
    distinct?: VotersScalarFieldEnum | VotersScalarFieldEnum[]
  }

  /**
   * voters create
   */
  export type votersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
    /**
     * The data needed to create a voters.
     */
    data: XOR<votersCreateInput, votersUncheckedCreateInput>
  }

  /**
   * voters createMany
   */
  export type votersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many voters.
     */
    data: votersCreateManyInput | votersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * voters update
   */
  export type votersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
    /**
     * The data needed to update a voters.
     */
    data: XOR<votersUpdateInput, votersUncheckedUpdateInput>
    /**
     * Choose, which voters to update.
     */
    where: votersWhereUniqueInput
  }

  /**
   * voters updateMany
   */
  export type votersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update voters.
     */
    data: XOR<votersUpdateManyMutationInput, votersUncheckedUpdateManyInput>
    /**
     * Filter which voters to update
     */
    where?: votersWhereInput
    /**
     * Limit how many voters to update.
     */
    limit?: number
  }

  /**
   * voters upsert
   */
  export type votersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
    /**
     * The filter to search for the voters to update in case it exists.
     */
    where: votersWhereUniqueInput
    /**
     * In case the voters found by the `where` argument doesn't exist, create a new voters with this data.
     */
    create: XOR<votersCreateInput, votersUncheckedCreateInput>
    /**
     * In case the voters was found with the provided `where` argument, update it with this data.
     */
    update: XOR<votersUpdateInput, votersUncheckedUpdateInput>
  }

  /**
   * voters delete
   */
  export type votersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
    /**
     * Filter which voters to delete.
     */
    where: votersWhereUniqueInput
  }

  /**
   * voters deleteMany
   */
  export type votersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which voters to delete
     */
    where?: votersWhereInput
    /**
     * Limit how many voters to delete.
     */
    limit?: number
  }

  /**
   * voters.districts
   */
  export type voters$districtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the districts
     */
    select?: districtsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the districts
     */
    omit?: districtsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: districtsInclude<ExtArgs> | null
    where?: districtsWhereInput
  }

  /**
   * voters without action
   */
  export type votersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the voters
     */
    select?: votersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the voters
     */
    omit?: votersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: votersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password_hash: 'password_hash',
    role: 'role',
    email: 'email',
    twofa_secret: 'twofa_secret',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const Audit_logsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    action: 'action',
    entity: 'entity',
    entity_id: 'entity_id',
    details: 'details',
    created_at: 'created_at'
  };

  export type Audit_logsScalarFieldEnum = (typeof Audit_logsScalarFieldEnum)[keyof typeof Audit_logsScalarFieldEnum]


  export const CandidatesScalarFieldEnum: {
    id: 'id',
    election_id: 'election_id',
    party_id: 'party_id',
    district_id: 'district_id',
    name: 'name',
    bio: 'bio',
    photo_url: 'photo_url',
    created_at: 'created_at'
  };

  export type CandidatesScalarFieldEnum = (typeof CandidatesScalarFieldEnum)[keyof typeof CandidatesScalarFieldEnum]


  export const DistrictsScalarFieldEnum: {
    id: 'id',
    election_id: 'election_id',
    name: 'name',
    description: 'description',
    created_at: 'created_at'
  };

  export type DistrictsScalarFieldEnum = (typeof DistrictsScalarFieldEnum)[keyof typeof DistrictsScalarFieldEnum]


  export const ElectionsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    start_date: 'start_date',
    end_date: 'end_date',
    status: 'status',
    contract_address: 'contract_address',
    created_by: 'created_by',
    created_at: 'created_at'
  };

  export type ElectionsScalarFieldEnum = (typeof ElectionsScalarFieldEnum)[keyof typeof ElectionsScalarFieldEnum]


  export const PartiesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    abbreviation: 'abbreviation',
    logo_url: 'logo_url',
    created_at: 'created_at'
  };

  export type PartiesScalarFieldEnum = (typeof PartiesScalarFieldEnum)[keyof typeof PartiesScalarFieldEnum]


  export const VotersScalarFieldEnum: {
    id: 'id',
    election_id: 'election_id',
    district_id: 'district_id',
    voter_id: 'voter_id',
    name: 'name',
    public_key: 'public_key',
    data_encrypted: 'data_encrypted',
    is_verified: 'is_verified',
    created_at: 'created_at'
  };

  export type VotersScalarFieldEnum = (typeof VotersScalarFieldEnum)[keyof typeof VotersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const usersOrderByRelevanceFieldEnum: {
    username: 'username',
    password_hash: 'password_hash',
    email: 'email',
    twofa_secret: 'twofa_secret'
  };

  export type usersOrderByRelevanceFieldEnum = (typeof usersOrderByRelevanceFieldEnum)[keyof typeof usersOrderByRelevanceFieldEnum]


  export const audit_logsOrderByRelevanceFieldEnum: {
    action: 'action',
    entity: 'entity',
    details: 'details'
  };

  export type audit_logsOrderByRelevanceFieldEnum = (typeof audit_logsOrderByRelevanceFieldEnum)[keyof typeof audit_logsOrderByRelevanceFieldEnum]


  export const candidatesOrderByRelevanceFieldEnum: {
    name: 'name',
    bio: 'bio',
    photo_url: 'photo_url'
  };

  export type candidatesOrderByRelevanceFieldEnum = (typeof candidatesOrderByRelevanceFieldEnum)[keyof typeof candidatesOrderByRelevanceFieldEnum]


  export const districtsOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description'
  };

  export type districtsOrderByRelevanceFieldEnum = (typeof districtsOrderByRelevanceFieldEnum)[keyof typeof districtsOrderByRelevanceFieldEnum]


  export const electionsOrderByRelevanceFieldEnum: {
    title: 'title',
    description: 'description',
    contract_address: 'contract_address'
  };

  export type electionsOrderByRelevanceFieldEnum = (typeof electionsOrderByRelevanceFieldEnum)[keyof typeof electionsOrderByRelevanceFieldEnum]


  export const partiesOrderByRelevanceFieldEnum: {
    name: 'name',
    abbreviation: 'abbreviation',
    logo_url: 'logo_url'
  };

  export type partiesOrderByRelevanceFieldEnum = (typeof partiesOrderByRelevanceFieldEnum)[keyof typeof partiesOrderByRelevanceFieldEnum]


  export const votersOrderByRelevanceFieldEnum: {
    voter_id: 'voter_id',
    name: 'name',
    public_key: 'public_key',
    data_encrypted: 'data_encrypted'
  };

  export type votersOrderByRelevanceFieldEnum = (typeof votersOrderByRelevanceFieldEnum)[keyof typeof votersOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'users_role'
   */
  export type Enumusers_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_role'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'elections_status'
   */
  export type Enumelections_statusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'elections_status'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: BigIntFilter<"users"> | bigint | number
    username?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    role?: Enumusers_roleFilter<"users"> | $Enums.users_role
    email?: StringNullableFilter<"users"> | string | null
    twofa_secret?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    audit_logs?: Audit_logsListRelationFilter
    elections?: ElectionsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    email?: SortOrderInput | SortOrder
    twofa_secret?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    audit_logs?: audit_logsOrderByRelationAggregateInput
    elections?: electionsOrderByRelationAggregateInput
    _relevance?: usersOrderByRelevanceInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    username?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password_hash?: StringFilter<"users"> | string
    role?: Enumusers_roleFilter<"users"> | $Enums.users_role
    twofa_secret?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    audit_logs?: Audit_logsListRelationFilter
    elections?: ElectionsListRelationFilter
  }, "id" | "username" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    email?: SortOrderInput | SortOrder
    twofa_secret?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"users"> | bigint | number
    username?: StringWithAggregatesFilter<"users"> | string
    password_hash?: StringWithAggregatesFilter<"users"> | string
    role?: Enumusers_roleWithAggregatesFilter<"users"> | $Enums.users_role
    email?: StringNullableWithAggregatesFilter<"users"> | string | null
    twofa_secret?: StringNullableWithAggregatesFilter<"users"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type audit_logsWhereInput = {
    AND?: audit_logsWhereInput | audit_logsWhereInput[]
    OR?: audit_logsWhereInput[]
    NOT?: audit_logsWhereInput | audit_logsWhereInput[]
    id?: BigIntFilter<"audit_logs"> | bigint | number
    user_id?: BigIntNullableFilter<"audit_logs"> | bigint | number | null
    action?: StringFilter<"audit_logs"> | string
    entity?: StringNullableFilter<"audit_logs"> | string | null
    entity_id?: BigIntNullableFilter<"audit_logs"> | bigint | number | null
    details?: StringNullableFilter<"audit_logs"> | string | null
    created_at?: DateTimeNullableFilter<"audit_logs"> | Date | string | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type audit_logsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrderInput | SortOrder
    entity_id?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
    _relevance?: audit_logsOrderByRelevanceInput
  }

  export type audit_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: audit_logsWhereInput | audit_logsWhereInput[]
    OR?: audit_logsWhereInput[]
    NOT?: audit_logsWhereInput | audit_logsWhereInput[]
    user_id?: BigIntNullableFilter<"audit_logs"> | bigint | number | null
    action?: StringFilter<"audit_logs"> | string
    entity?: StringNullableFilter<"audit_logs"> | string | null
    entity_id?: BigIntNullableFilter<"audit_logs"> | bigint | number | null
    details?: StringNullableFilter<"audit_logs"> | string | null
    created_at?: DateTimeNullableFilter<"audit_logs"> | Date | string | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type audit_logsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrderInput | SortOrder
    entity_id?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: audit_logsCountOrderByAggregateInput
    _avg?: audit_logsAvgOrderByAggregateInput
    _max?: audit_logsMaxOrderByAggregateInput
    _min?: audit_logsMinOrderByAggregateInput
    _sum?: audit_logsSumOrderByAggregateInput
  }

  export type audit_logsScalarWhereWithAggregatesInput = {
    AND?: audit_logsScalarWhereWithAggregatesInput | audit_logsScalarWhereWithAggregatesInput[]
    OR?: audit_logsScalarWhereWithAggregatesInput[]
    NOT?: audit_logsScalarWhereWithAggregatesInput | audit_logsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"audit_logs"> | bigint | number
    user_id?: BigIntNullableWithAggregatesFilter<"audit_logs"> | bigint | number | null
    action?: StringWithAggregatesFilter<"audit_logs"> | string
    entity?: StringNullableWithAggregatesFilter<"audit_logs"> | string | null
    entity_id?: BigIntNullableWithAggregatesFilter<"audit_logs"> | bigint | number | null
    details?: StringNullableWithAggregatesFilter<"audit_logs"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"audit_logs"> | Date | string | null
  }

  export type candidatesWhereInput = {
    AND?: candidatesWhereInput | candidatesWhereInput[]
    OR?: candidatesWhereInput[]
    NOT?: candidatesWhereInput | candidatesWhereInput[]
    id?: BigIntFilter<"candidates"> | bigint | number
    election_id?: BigIntFilter<"candidates"> | bigint | number
    party_id?: BigIntNullableFilter<"candidates"> | bigint | number | null
    district_id?: BigIntFilter<"candidates"> | bigint | number
    name?: StringFilter<"candidates"> | string
    bio?: StringNullableFilter<"candidates"> | string | null
    photo_url?: StringNullableFilter<"candidates"> | string | null
    created_at?: DateTimeNullableFilter<"candidates"> | Date | string | null
    elections?: XOR<ElectionsScalarRelationFilter, electionsWhereInput>
    parties?: XOR<PartiesNullableScalarRelationFilter, partiesWhereInput> | null
    districts?: XOR<DistrictsScalarRelationFilter, districtsWhereInput>
  }

  export type candidatesOrderByWithRelationInput = {
    id?: SortOrder
    election_id?: SortOrder
    party_id?: SortOrderInput | SortOrder
    district_id?: SortOrder
    name?: SortOrder
    bio?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    elections?: electionsOrderByWithRelationInput
    parties?: partiesOrderByWithRelationInput
    districts?: districtsOrderByWithRelationInput
    _relevance?: candidatesOrderByRelevanceInput
  }

  export type candidatesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: candidatesWhereInput | candidatesWhereInput[]
    OR?: candidatesWhereInput[]
    NOT?: candidatesWhereInput | candidatesWhereInput[]
    election_id?: BigIntFilter<"candidates"> | bigint | number
    party_id?: BigIntNullableFilter<"candidates"> | bigint | number | null
    district_id?: BigIntFilter<"candidates"> | bigint | number
    name?: StringFilter<"candidates"> | string
    bio?: StringNullableFilter<"candidates"> | string | null
    photo_url?: StringNullableFilter<"candidates"> | string | null
    created_at?: DateTimeNullableFilter<"candidates"> | Date | string | null
    elections?: XOR<ElectionsScalarRelationFilter, electionsWhereInput>
    parties?: XOR<PartiesNullableScalarRelationFilter, partiesWhereInput> | null
    districts?: XOR<DistrictsScalarRelationFilter, districtsWhereInput>
  }, "id">

  export type candidatesOrderByWithAggregationInput = {
    id?: SortOrder
    election_id?: SortOrder
    party_id?: SortOrderInput | SortOrder
    district_id?: SortOrder
    name?: SortOrder
    bio?: SortOrderInput | SortOrder
    photo_url?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: candidatesCountOrderByAggregateInput
    _avg?: candidatesAvgOrderByAggregateInput
    _max?: candidatesMaxOrderByAggregateInput
    _min?: candidatesMinOrderByAggregateInput
    _sum?: candidatesSumOrderByAggregateInput
  }

  export type candidatesScalarWhereWithAggregatesInput = {
    AND?: candidatesScalarWhereWithAggregatesInput | candidatesScalarWhereWithAggregatesInput[]
    OR?: candidatesScalarWhereWithAggregatesInput[]
    NOT?: candidatesScalarWhereWithAggregatesInput | candidatesScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"candidates"> | bigint | number
    election_id?: BigIntWithAggregatesFilter<"candidates"> | bigint | number
    party_id?: BigIntNullableWithAggregatesFilter<"candidates"> | bigint | number | null
    district_id?: BigIntWithAggregatesFilter<"candidates"> | bigint | number
    name?: StringWithAggregatesFilter<"candidates"> | string
    bio?: StringNullableWithAggregatesFilter<"candidates"> | string | null
    photo_url?: StringNullableWithAggregatesFilter<"candidates"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"candidates"> | Date | string | null
  }

  export type districtsWhereInput = {
    AND?: districtsWhereInput | districtsWhereInput[]
    OR?: districtsWhereInput[]
    NOT?: districtsWhereInput | districtsWhereInput[]
    id?: BigIntFilter<"districts"> | bigint | number
    election_id?: BigIntFilter<"districts"> | bigint | number
    name?: StringFilter<"districts"> | string
    description?: StringNullableFilter<"districts"> | string | null
    created_at?: DateTimeNullableFilter<"districts"> | Date | string | null
    candidates?: CandidatesListRelationFilter
    elections?: XOR<ElectionsScalarRelationFilter, electionsWhereInput>
    voters?: VotersListRelationFilter
  }

  export type districtsOrderByWithRelationInput = {
    id?: SortOrder
    election_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    candidates?: candidatesOrderByRelationAggregateInput
    elections?: electionsOrderByWithRelationInput
    voters?: votersOrderByRelationAggregateInput
    _relevance?: districtsOrderByRelevanceInput
  }

  export type districtsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: districtsWhereInput | districtsWhereInput[]
    OR?: districtsWhereInput[]
    NOT?: districtsWhereInput | districtsWhereInput[]
    election_id?: BigIntFilter<"districts"> | bigint | number
    name?: StringFilter<"districts"> | string
    description?: StringNullableFilter<"districts"> | string | null
    created_at?: DateTimeNullableFilter<"districts"> | Date | string | null
    candidates?: CandidatesListRelationFilter
    elections?: XOR<ElectionsScalarRelationFilter, electionsWhereInput>
    voters?: VotersListRelationFilter
  }, "id">

  export type districtsOrderByWithAggregationInput = {
    id?: SortOrder
    election_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: districtsCountOrderByAggregateInput
    _avg?: districtsAvgOrderByAggregateInput
    _max?: districtsMaxOrderByAggregateInput
    _min?: districtsMinOrderByAggregateInput
    _sum?: districtsSumOrderByAggregateInput
  }

  export type districtsScalarWhereWithAggregatesInput = {
    AND?: districtsScalarWhereWithAggregatesInput | districtsScalarWhereWithAggregatesInput[]
    OR?: districtsScalarWhereWithAggregatesInput[]
    NOT?: districtsScalarWhereWithAggregatesInput | districtsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"districts"> | bigint | number
    election_id?: BigIntWithAggregatesFilter<"districts"> | bigint | number
    name?: StringWithAggregatesFilter<"districts"> | string
    description?: StringNullableWithAggregatesFilter<"districts"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"districts"> | Date | string | null
  }

  export type electionsWhereInput = {
    AND?: electionsWhereInput | electionsWhereInput[]
    OR?: electionsWhereInput[]
    NOT?: electionsWhereInput | electionsWhereInput[]
    id?: BigIntFilter<"elections"> | bigint | number
    title?: StringFilter<"elections"> | string
    description?: StringNullableFilter<"elections"> | string | null
    start_date?: DateTimeNullableFilter<"elections"> | Date | string | null
    end_date?: DateTimeNullableFilter<"elections"> | Date | string | null
    status?: Enumelections_statusNullableFilter<"elections"> | $Enums.elections_status | null
    contract_address?: StringNullableFilter<"elections"> | string | null
    created_by?: BigIntNullableFilter<"elections"> | bigint | number | null
    created_at?: DateTimeNullableFilter<"elections"> | Date | string | null
    candidates?: CandidatesListRelationFilter
    districts?: DistrictsListRelationFilter
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    voters?: VotersListRelationFilter
  }

  export type electionsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    start_date?: SortOrderInput | SortOrder
    end_date?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    contract_address?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    candidates?: candidatesOrderByRelationAggregateInput
    districts?: districtsOrderByRelationAggregateInput
    users?: usersOrderByWithRelationInput
    voters?: votersOrderByRelationAggregateInput
    _relevance?: electionsOrderByRelevanceInput
  }

  export type electionsWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: electionsWhereInput | electionsWhereInput[]
    OR?: electionsWhereInput[]
    NOT?: electionsWhereInput | electionsWhereInput[]
    title?: StringFilter<"elections"> | string
    description?: StringNullableFilter<"elections"> | string | null
    start_date?: DateTimeNullableFilter<"elections"> | Date | string | null
    end_date?: DateTimeNullableFilter<"elections"> | Date | string | null
    status?: Enumelections_statusNullableFilter<"elections"> | $Enums.elections_status | null
    contract_address?: StringNullableFilter<"elections"> | string | null
    created_by?: BigIntNullableFilter<"elections"> | bigint | number | null
    created_at?: DateTimeNullableFilter<"elections"> | Date | string | null
    candidates?: CandidatesListRelationFilter
    districts?: DistrictsListRelationFilter
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    voters?: VotersListRelationFilter
  }, "id">

  export type electionsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    start_date?: SortOrderInput | SortOrder
    end_date?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    contract_address?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: electionsCountOrderByAggregateInput
    _avg?: electionsAvgOrderByAggregateInput
    _max?: electionsMaxOrderByAggregateInput
    _min?: electionsMinOrderByAggregateInput
    _sum?: electionsSumOrderByAggregateInput
  }

  export type electionsScalarWhereWithAggregatesInput = {
    AND?: electionsScalarWhereWithAggregatesInput | electionsScalarWhereWithAggregatesInput[]
    OR?: electionsScalarWhereWithAggregatesInput[]
    NOT?: electionsScalarWhereWithAggregatesInput | electionsScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"elections"> | bigint | number
    title?: StringWithAggregatesFilter<"elections"> | string
    description?: StringNullableWithAggregatesFilter<"elections"> | string | null
    start_date?: DateTimeNullableWithAggregatesFilter<"elections"> | Date | string | null
    end_date?: DateTimeNullableWithAggregatesFilter<"elections"> | Date | string | null
    status?: Enumelections_statusNullableWithAggregatesFilter<"elections"> | $Enums.elections_status | null
    contract_address?: StringNullableWithAggregatesFilter<"elections"> | string | null
    created_by?: BigIntNullableWithAggregatesFilter<"elections"> | bigint | number | null
    created_at?: DateTimeNullableWithAggregatesFilter<"elections"> | Date | string | null
  }

  export type partiesWhereInput = {
    AND?: partiesWhereInput | partiesWhereInput[]
    OR?: partiesWhereInput[]
    NOT?: partiesWhereInput | partiesWhereInput[]
    id?: BigIntFilter<"parties"> | bigint | number
    name?: StringFilter<"parties"> | string
    abbreviation?: StringNullableFilter<"parties"> | string | null
    logo_url?: StringNullableFilter<"parties"> | string | null
    created_at?: DateTimeNullableFilter<"parties"> | Date | string | null
    candidates?: CandidatesListRelationFilter
  }

  export type partiesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    abbreviation?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    candidates?: candidatesOrderByRelationAggregateInput
    _relevance?: partiesOrderByRelevanceInput
  }

  export type partiesWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: partiesWhereInput | partiesWhereInput[]
    OR?: partiesWhereInput[]
    NOT?: partiesWhereInput | partiesWhereInput[]
    name?: StringFilter<"parties"> | string
    abbreviation?: StringNullableFilter<"parties"> | string | null
    logo_url?: StringNullableFilter<"parties"> | string | null
    created_at?: DateTimeNullableFilter<"parties"> | Date | string | null
    candidates?: CandidatesListRelationFilter
  }, "id">

  export type partiesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    abbreviation?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: partiesCountOrderByAggregateInput
    _avg?: partiesAvgOrderByAggregateInput
    _max?: partiesMaxOrderByAggregateInput
    _min?: partiesMinOrderByAggregateInput
    _sum?: partiesSumOrderByAggregateInput
  }

  export type partiesScalarWhereWithAggregatesInput = {
    AND?: partiesScalarWhereWithAggregatesInput | partiesScalarWhereWithAggregatesInput[]
    OR?: partiesScalarWhereWithAggregatesInput[]
    NOT?: partiesScalarWhereWithAggregatesInput | partiesScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"parties"> | bigint | number
    name?: StringWithAggregatesFilter<"parties"> | string
    abbreviation?: StringNullableWithAggregatesFilter<"parties"> | string | null
    logo_url?: StringNullableWithAggregatesFilter<"parties"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"parties"> | Date | string | null
  }

  export type votersWhereInput = {
    AND?: votersWhereInput | votersWhereInput[]
    OR?: votersWhereInput[]
    NOT?: votersWhereInput | votersWhereInput[]
    id?: BigIntFilter<"voters"> | bigint | number
    election_id?: BigIntFilter<"voters"> | bigint | number
    district_id?: BigIntNullableFilter<"voters"> | bigint | number | null
    voter_id?: StringFilter<"voters"> | string
    name?: StringNullableFilter<"voters"> | string | null
    public_key?: StringNullableFilter<"voters"> | string | null
    data_encrypted?: StringNullableFilter<"voters"> | string | null
    is_verified?: BoolNullableFilter<"voters"> | boolean | null
    created_at?: DateTimeNullableFilter<"voters"> | Date | string | null
    elections?: XOR<ElectionsScalarRelationFilter, electionsWhereInput>
    districts?: XOR<DistrictsNullableScalarRelationFilter, districtsWhereInput> | null
  }

  export type votersOrderByWithRelationInput = {
    id?: SortOrder
    election_id?: SortOrder
    district_id?: SortOrderInput | SortOrder
    voter_id?: SortOrder
    name?: SortOrderInput | SortOrder
    public_key?: SortOrderInput | SortOrder
    data_encrypted?: SortOrderInput | SortOrder
    is_verified?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    elections?: electionsOrderByWithRelationInput
    districts?: districtsOrderByWithRelationInput
    _relevance?: votersOrderByRelevanceInput
  }

  export type votersWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    election_id_voter_id?: votersElection_idVoter_idCompoundUniqueInput
    AND?: votersWhereInput | votersWhereInput[]
    OR?: votersWhereInput[]
    NOT?: votersWhereInput | votersWhereInput[]
    election_id?: BigIntFilter<"voters"> | bigint | number
    district_id?: BigIntNullableFilter<"voters"> | bigint | number | null
    voter_id?: StringFilter<"voters"> | string
    name?: StringNullableFilter<"voters"> | string | null
    public_key?: StringNullableFilter<"voters"> | string | null
    data_encrypted?: StringNullableFilter<"voters"> | string | null
    is_verified?: BoolNullableFilter<"voters"> | boolean | null
    created_at?: DateTimeNullableFilter<"voters"> | Date | string | null
    elections?: XOR<ElectionsScalarRelationFilter, electionsWhereInput>
    districts?: XOR<DistrictsNullableScalarRelationFilter, districtsWhereInput> | null
  }, "id" | "election_id_voter_id">

  export type votersOrderByWithAggregationInput = {
    id?: SortOrder
    election_id?: SortOrder
    district_id?: SortOrderInput | SortOrder
    voter_id?: SortOrder
    name?: SortOrderInput | SortOrder
    public_key?: SortOrderInput | SortOrder
    data_encrypted?: SortOrderInput | SortOrder
    is_verified?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: votersCountOrderByAggregateInput
    _avg?: votersAvgOrderByAggregateInput
    _max?: votersMaxOrderByAggregateInput
    _min?: votersMinOrderByAggregateInput
    _sum?: votersSumOrderByAggregateInput
  }

  export type votersScalarWhereWithAggregatesInput = {
    AND?: votersScalarWhereWithAggregatesInput | votersScalarWhereWithAggregatesInput[]
    OR?: votersScalarWhereWithAggregatesInput[]
    NOT?: votersScalarWhereWithAggregatesInput | votersScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"voters"> | bigint | number
    election_id?: BigIntWithAggregatesFilter<"voters"> | bigint | number
    district_id?: BigIntNullableWithAggregatesFilter<"voters"> | bigint | number | null
    voter_id?: StringWithAggregatesFilter<"voters"> | string
    name?: StringNullableWithAggregatesFilter<"voters"> | string | null
    public_key?: StringNullableWithAggregatesFilter<"voters"> | string | null
    data_encrypted?: StringNullableWithAggregatesFilter<"voters"> | string | null
    is_verified?: BoolNullableWithAggregatesFilter<"voters"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"voters"> | Date | string | null
  }

  export type usersCreateInput = {
    id?: bigint | number
    username: string
    password_hash: string
    role: $Enums.users_role
    email?: string | null
    twofa_secret?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
    elections?: electionsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: bigint | number
    username: string
    password_hash: string
    role: $Enums.users_role
    email?: string | null
    twofa_secret?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
    elections?: electionsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    email?: NullableStringFieldUpdateOperationsInput | string | null
    twofa_secret?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
    elections?: electionsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    email?: NullableStringFieldUpdateOperationsInput | string | null
    twofa_secret?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
    elections?: electionsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: bigint | number
    username: string
    password_hash: string
    role: $Enums.users_role
    email?: string | null
    twofa_secret?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    email?: NullableStringFieldUpdateOperationsInput | string | null
    twofa_secret?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    email?: NullableStringFieldUpdateOperationsInput | string | null
    twofa_secret?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type audit_logsCreateInput = {
    id?: bigint | number
    action: string
    entity?: string | null
    entity_id?: bigint | number | null
    details?: string | null
    created_at?: Date | string | null
    users?: usersCreateNestedOneWithoutAudit_logsInput
  }

  export type audit_logsUncheckedCreateInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    action: string
    entity?: string | null
    entity_id?: bigint | number | null
    details?: string | null
    created_at?: Date | string | null
  }

  export type audit_logsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entity?: NullableStringFieldUpdateOperationsInput | string | null
    entity_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutAudit_logsNestedInput
  }

  export type audit_logsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: NullableStringFieldUpdateOperationsInput | string | null
    entity_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type audit_logsCreateManyInput = {
    id?: bigint | number
    user_id?: bigint | number | null
    action: string
    entity?: string | null
    entity_id?: bigint | number | null
    details?: string | null
    created_at?: Date | string | null
  }

  export type audit_logsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entity?: NullableStringFieldUpdateOperationsInput | string | null
    entity_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type audit_logsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    user_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: NullableStringFieldUpdateOperationsInput | string | null
    entity_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type candidatesCreateInput = {
    id?: bigint | number
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
    elections: electionsCreateNestedOneWithoutCandidatesInput
    parties?: partiesCreateNestedOneWithoutCandidatesInput
    districts: districtsCreateNestedOneWithoutCandidatesInput
  }

  export type candidatesUncheckedCreateInput = {
    id?: bigint | number
    election_id: bigint | number
    party_id?: bigint | number | null
    district_id: bigint | number
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
  }

  export type candidatesUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elections?: electionsUpdateOneRequiredWithoutCandidatesNestedInput
    parties?: partiesUpdateOneWithoutCandidatesNestedInput
    districts?: districtsUpdateOneRequiredWithoutCandidatesNestedInput
  }

  export type candidatesUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    party_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    district_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type candidatesCreateManyInput = {
    id?: bigint | number
    election_id: bigint | number
    party_id?: bigint | number | null
    district_id: bigint | number
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
  }

  export type candidatesUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type candidatesUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    party_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    district_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type districtsCreateInput = {
    id?: bigint | number
    name: string
    description?: string | null
    created_at?: Date | string | null
    candidates?: candidatesCreateNestedManyWithoutDistrictsInput
    elections: electionsCreateNestedOneWithoutDistrictsInput
    voters?: votersCreateNestedManyWithoutDistrictsInput
  }

  export type districtsUncheckedCreateInput = {
    id?: bigint | number
    election_id: bigint | number
    name: string
    description?: string | null
    created_at?: Date | string | null
    candidates?: candidatesUncheckedCreateNestedManyWithoutDistrictsInput
    voters?: votersUncheckedCreateNestedManyWithoutDistrictsInput
  }

  export type districtsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUpdateManyWithoutDistrictsNestedInput
    elections?: electionsUpdateOneRequiredWithoutDistrictsNestedInput
    voters?: votersUpdateManyWithoutDistrictsNestedInput
  }

  export type districtsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUncheckedUpdateManyWithoutDistrictsNestedInput
    voters?: votersUncheckedUpdateManyWithoutDistrictsNestedInput
  }

  export type districtsCreateManyInput = {
    id?: bigint | number
    election_id: bigint | number
    name: string
    description?: string | null
    created_at?: Date | string | null
  }

  export type districtsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type districtsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type electionsCreateInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_at?: Date | string | null
    candidates?: candidatesCreateNestedManyWithoutElectionsInput
    districts?: districtsCreateNestedManyWithoutElectionsInput
    users?: usersCreateNestedOneWithoutElectionsInput
    voters?: votersCreateNestedManyWithoutElectionsInput
  }

  export type electionsUncheckedCreateInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_by?: bigint | number | null
    created_at?: Date | string | null
    candidates?: candidatesUncheckedCreateNestedManyWithoutElectionsInput
    districts?: districtsUncheckedCreateNestedManyWithoutElectionsInput
    voters?: votersUncheckedCreateNestedManyWithoutElectionsInput
  }

  export type electionsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUpdateManyWithoutElectionsNestedInput
    districts?: districtsUpdateManyWithoutElectionsNestedInput
    users?: usersUpdateOneWithoutElectionsNestedInput
    voters?: votersUpdateManyWithoutElectionsNestedInput
  }

  export type electionsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUncheckedUpdateManyWithoutElectionsNestedInput
    districts?: districtsUncheckedUpdateManyWithoutElectionsNestedInput
    voters?: votersUncheckedUpdateManyWithoutElectionsNestedInput
  }

  export type electionsCreateManyInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_by?: bigint | number | null
    created_at?: Date | string | null
  }

  export type electionsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type electionsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type partiesCreateInput = {
    id?: bigint | number
    name: string
    abbreviation?: string | null
    logo_url?: string | null
    created_at?: Date | string | null
    candidates?: candidatesCreateNestedManyWithoutPartiesInput
  }

  export type partiesUncheckedCreateInput = {
    id?: bigint | number
    name: string
    abbreviation?: string | null
    logo_url?: string | null
    created_at?: Date | string | null
    candidates?: candidatesUncheckedCreateNestedManyWithoutPartiesInput
  }

  export type partiesUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    abbreviation?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUpdateManyWithoutPartiesNestedInput
  }

  export type partiesUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    abbreviation?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUncheckedUpdateManyWithoutPartiesNestedInput
  }

  export type partiesCreateManyInput = {
    id?: bigint | number
    name: string
    abbreviation?: string | null
    logo_url?: string | null
    created_at?: Date | string | null
  }

  export type partiesUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    abbreviation?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type partiesUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    abbreviation?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type votersCreateInput = {
    id?: bigint | number
    voter_id: string
    name?: string | null
    public_key?: string | null
    data_encrypted?: string | null
    is_verified?: boolean | null
    created_at?: Date | string | null
    elections: electionsCreateNestedOneWithoutVotersInput
    districts?: districtsCreateNestedOneWithoutVotersInput
  }

  export type votersUncheckedCreateInput = {
    id?: bigint | number
    election_id: bigint | number
    district_id?: bigint | number | null
    voter_id: string
    name?: string | null
    public_key?: string | null
    data_encrypted?: string | null
    is_verified?: boolean | null
    created_at?: Date | string | null
  }

  export type votersUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    voter_id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    public_key?: NullableStringFieldUpdateOperationsInput | string | null
    data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elections?: electionsUpdateOneRequiredWithoutVotersNestedInput
    districts?: districtsUpdateOneWithoutVotersNestedInput
  }

  export type votersUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    district_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    voter_id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    public_key?: NullableStringFieldUpdateOperationsInput | string | null
    data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type votersCreateManyInput = {
    id?: bigint | number
    election_id: bigint | number
    district_id?: bigint | number | null
    voter_id: string
    name?: string | null
    public_key?: string | null
    data_encrypted?: string | null
    is_verified?: boolean | null
    created_at?: Date | string | null
  }

  export type votersUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    voter_id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    public_key?: NullableStringFieldUpdateOperationsInput | string | null
    data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type votersUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    district_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    voter_id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    public_key?: NullableStringFieldUpdateOperationsInput | string | null
    data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type Enumusers_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleFilter<$PrismaModel> | $Enums.users_role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type Audit_logsListRelationFilter = {
    every?: audit_logsWhereInput
    some?: audit_logsWhereInput
    none?: audit_logsWhereInput
  }

  export type ElectionsListRelationFilter = {
    every?: electionsWhereInput
    some?: electionsWhereInput
    none?: electionsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type audit_logsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type electionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelevanceInput = {
    fields: usersOrderByRelevanceFieldEnum | usersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    email?: SortOrder
    twofa_secret?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    email?: SortOrder
    twofa_secret?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    role?: SortOrder
    email?: SortOrder
    twofa_secret?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type Enumusers_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleWithAggregatesFilter<$PrismaModel> | $Enums.users_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_roleFilter<$PrismaModel>
    _max?: NestedEnumusers_roleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type audit_logsOrderByRelevanceInput = {
    fields: audit_logsOrderByRelevanceFieldEnum | audit_logsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type audit_logsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entity_id?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type audit_logsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    entity_id?: SortOrder
  }

  export type audit_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entity_id?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type audit_logsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entity_id?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type audit_logsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    entity_id?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type ElectionsScalarRelationFilter = {
    is?: electionsWhereInput
    isNot?: electionsWhereInput
  }

  export type PartiesNullableScalarRelationFilter = {
    is?: partiesWhereInput | null
    isNot?: partiesWhereInput | null
  }

  export type DistrictsScalarRelationFilter = {
    is?: districtsWhereInput
    isNot?: districtsWhereInput
  }

  export type candidatesOrderByRelevanceInput = {
    fields: candidatesOrderByRelevanceFieldEnum | candidatesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type candidatesCountOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    party_id?: SortOrder
    district_id?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    photo_url?: SortOrder
    created_at?: SortOrder
  }

  export type candidatesAvgOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    party_id?: SortOrder
    district_id?: SortOrder
  }

  export type candidatesMaxOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    party_id?: SortOrder
    district_id?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    photo_url?: SortOrder
    created_at?: SortOrder
  }

  export type candidatesMinOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    party_id?: SortOrder
    district_id?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    photo_url?: SortOrder
    created_at?: SortOrder
  }

  export type candidatesSumOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    party_id?: SortOrder
    district_id?: SortOrder
  }

  export type CandidatesListRelationFilter = {
    every?: candidatesWhereInput
    some?: candidatesWhereInput
    none?: candidatesWhereInput
  }

  export type VotersListRelationFilter = {
    every?: votersWhereInput
    some?: votersWhereInput
    none?: votersWhereInput
  }

  export type candidatesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type votersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type districtsOrderByRelevanceInput = {
    fields: districtsOrderByRelevanceFieldEnum | districtsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type districtsCountOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type districtsAvgOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
  }

  export type districtsMaxOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type districtsMinOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type districtsSumOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
  }

  export type Enumelections_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.elections_status | Enumelections_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.elections_status[] | null
    notIn?: $Enums.elections_status[] | null
    not?: NestedEnumelections_statusNullableFilter<$PrismaModel> | $Enums.elections_status | null
  }

  export type DistrictsListRelationFilter = {
    every?: districtsWhereInput
    some?: districtsWhereInput
    none?: districtsWhereInput
  }

  export type districtsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type electionsOrderByRelevanceInput = {
    fields: electionsOrderByRelevanceFieldEnum | electionsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type electionsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    contract_address?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type electionsAvgOrderByAggregateInput = {
    id?: SortOrder
    created_by?: SortOrder
  }

  export type electionsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    contract_address?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type electionsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    status?: SortOrder
    contract_address?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type electionsSumOrderByAggregateInput = {
    id?: SortOrder
    created_by?: SortOrder
  }

  export type Enumelections_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.elections_status | Enumelections_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.elections_status[] | null
    notIn?: $Enums.elections_status[] | null
    not?: NestedEnumelections_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.elections_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumelections_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumelections_statusNullableFilter<$PrismaModel>
  }

  export type partiesOrderByRelevanceInput = {
    fields: partiesOrderByRelevanceFieldEnum | partiesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type partiesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    abbreviation?: SortOrder
    logo_url?: SortOrder
    created_at?: SortOrder
  }

  export type partiesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type partiesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    abbreviation?: SortOrder
    logo_url?: SortOrder
    created_at?: SortOrder
  }

  export type partiesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    abbreviation?: SortOrder
    logo_url?: SortOrder
    created_at?: SortOrder
  }

  export type partiesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type DistrictsNullableScalarRelationFilter = {
    is?: districtsWhereInput | null
    isNot?: districtsWhereInput | null
  }

  export type votersOrderByRelevanceInput = {
    fields: votersOrderByRelevanceFieldEnum | votersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type votersElection_idVoter_idCompoundUniqueInput = {
    election_id: bigint | number
    voter_id: string
  }

  export type votersCountOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    district_id?: SortOrder
    voter_id?: SortOrder
    name?: SortOrder
    public_key?: SortOrder
    data_encrypted?: SortOrder
    is_verified?: SortOrder
    created_at?: SortOrder
  }

  export type votersAvgOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    district_id?: SortOrder
  }

  export type votersMaxOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    district_id?: SortOrder
    voter_id?: SortOrder
    name?: SortOrder
    public_key?: SortOrder
    data_encrypted?: SortOrder
    is_verified?: SortOrder
    created_at?: SortOrder
  }

  export type votersMinOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    district_id?: SortOrder
    voter_id?: SortOrder
    name?: SortOrder
    public_key?: SortOrder
    data_encrypted?: SortOrder
    is_verified?: SortOrder
    created_at?: SortOrder
  }

  export type votersSumOrderByAggregateInput = {
    id?: SortOrder
    election_id?: SortOrder
    district_id?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type audit_logsCreateNestedManyWithoutUsersInput = {
    create?: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput> | audit_logsCreateWithoutUsersInput[] | audit_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: audit_logsCreateOrConnectWithoutUsersInput | audit_logsCreateOrConnectWithoutUsersInput[]
    createMany?: audit_logsCreateManyUsersInputEnvelope
    connect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
  }

  export type electionsCreateNestedManyWithoutUsersInput = {
    create?: XOR<electionsCreateWithoutUsersInput, electionsUncheckedCreateWithoutUsersInput> | electionsCreateWithoutUsersInput[] | electionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: electionsCreateOrConnectWithoutUsersInput | electionsCreateOrConnectWithoutUsersInput[]
    createMany?: electionsCreateManyUsersInputEnvelope
    connect?: electionsWhereUniqueInput | electionsWhereUniqueInput[]
  }

  export type audit_logsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput> | audit_logsCreateWithoutUsersInput[] | audit_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: audit_logsCreateOrConnectWithoutUsersInput | audit_logsCreateOrConnectWithoutUsersInput[]
    createMany?: audit_logsCreateManyUsersInputEnvelope
    connect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
  }

  export type electionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<electionsCreateWithoutUsersInput, electionsUncheckedCreateWithoutUsersInput> | electionsCreateWithoutUsersInput[] | electionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: electionsCreateOrConnectWithoutUsersInput | electionsCreateOrConnectWithoutUsersInput[]
    createMany?: electionsCreateManyUsersInputEnvelope
    connect?: electionsWhereUniqueInput | electionsWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type Enumusers_roleFieldUpdateOperationsInput = {
    set?: $Enums.users_role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type audit_logsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput> | audit_logsCreateWithoutUsersInput[] | audit_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: audit_logsCreateOrConnectWithoutUsersInput | audit_logsCreateOrConnectWithoutUsersInput[]
    upsert?: audit_logsUpsertWithWhereUniqueWithoutUsersInput | audit_logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: audit_logsCreateManyUsersInputEnvelope
    set?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    disconnect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    delete?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    connect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    update?: audit_logsUpdateWithWhereUniqueWithoutUsersInput | audit_logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: audit_logsUpdateManyWithWhereWithoutUsersInput | audit_logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: audit_logsScalarWhereInput | audit_logsScalarWhereInput[]
  }

  export type electionsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<electionsCreateWithoutUsersInput, electionsUncheckedCreateWithoutUsersInput> | electionsCreateWithoutUsersInput[] | electionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: electionsCreateOrConnectWithoutUsersInput | electionsCreateOrConnectWithoutUsersInput[]
    upsert?: electionsUpsertWithWhereUniqueWithoutUsersInput | electionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: electionsCreateManyUsersInputEnvelope
    set?: electionsWhereUniqueInput | electionsWhereUniqueInput[]
    disconnect?: electionsWhereUniqueInput | electionsWhereUniqueInput[]
    delete?: electionsWhereUniqueInput | electionsWhereUniqueInput[]
    connect?: electionsWhereUniqueInput | electionsWhereUniqueInput[]
    update?: electionsUpdateWithWhereUniqueWithoutUsersInput | electionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: electionsUpdateManyWithWhereWithoutUsersInput | electionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: electionsScalarWhereInput | electionsScalarWhereInput[]
  }

  export type audit_logsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput> | audit_logsCreateWithoutUsersInput[] | audit_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: audit_logsCreateOrConnectWithoutUsersInput | audit_logsCreateOrConnectWithoutUsersInput[]
    upsert?: audit_logsUpsertWithWhereUniqueWithoutUsersInput | audit_logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: audit_logsCreateManyUsersInputEnvelope
    set?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    disconnect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    delete?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    connect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    update?: audit_logsUpdateWithWhereUniqueWithoutUsersInput | audit_logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: audit_logsUpdateManyWithWhereWithoutUsersInput | audit_logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: audit_logsScalarWhereInput | audit_logsScalarWhereInput[]
  }

  export type electionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<electionsCreateWithoutUsersInput, electionsUncheckedCreateWithoutUsersInput> | electionsCreateWithoutUsersInput[] | electionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: electionsCreateOrConnectWithoutUsersInput | electionsCreateOrConnectWithoutUsersInput[]
    upsert?: electionsUpsertWithWhereUniqueWithoutUsersInput | electionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: electionsCreateManyUsersInputEnvelope
    set?: electionsWhereUniqueInput | electionsWhereUniqueInput[]
    disconnect?: electionsWhereUniqueInput | electionsWhereUniqueInput[]
    delete?: electionsWhereUniqueInput | electionsWhereUniqueInput[]
    connect?: electionsWhereUniqueInput | electionsWhereUniqueInput[]
    update?: electionsUpdateWithWhereUniqueWithoutUsersInput | electionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: electionsUpdateManyWithWhereWithoutUsersInput | electionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: electionsScalarWhereInput | electionsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutAudit_logsInput = {
    create?: XOR<usersCreateWithoutAudit_logsInput, usersUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutAudit_logsInput
    connect?: usersWhereUniqueInput
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type usersUpdateOneWithoutAudit_logsNestedInput = {
    create?: XOR<usersCreateWithoutAudit_logsInput, usersUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutAudit_logsInput
    upsert?: usersUpsertWithoutAudit_logsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutAudit_logsInput, usersUpdateWithoutAudit_logsInput>, usersUncheckedUpdateWithoutAudit_logsInput>
  }

  export type electionsCreateNestedOneWithoutCandidatesInput = {
    create?: XOR<electionsCreateWithoutCandidatesInput, electionsUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: electionsCreateOrConnectWithoutCandidatesInput
    connect?: electionsWhereUniqueInput
  }

  export type partiesCreateNestedOneWithoutCandidatesInput = {
    create?: XOR<partiesCreateWithoutCandidatesInput, partiesUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: partiesCreateOrConnectWithoutCandidatesInput
    connect?: partiesWhereUniqueInput
  }

  export type districtsCreateNestedOneWithoutCandidatesInput = {
    create?: XOR<districtsCreateWithoutCandidatesInput, districtsUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: districtsCreateOrConnectWithoutCandidatesInput
    connect?: districtsWhereUniqueInput
  }

  export type electionsUpdateOneRequiredWithoutCandidatesNestedInput = {
    create?: XOR<electionsCreateWithoutCandidatesInput, electionsUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: electionsCreateOrConnectWithoutCandidatesInput
    upsert?: electionsUpsertWithoutCandidatesInput
    connect?: electionsWhereUniqueInput
    update?: XOR<XOR<electionsUpdateToOneWithWhereWithoutCandidatesInput, electionsUpdateWithoutCandidatesInput>, electionsUncheckedUpdateWithoutCandidatesInput>
  }

  export type partiesUpdateOneWithoutCandidatesNestedInput = {
    create?: XOR<partiesCreateWithoutCandidatesInput, partiesUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: partiesCreateOrConnectWithoutCandidatesInput
    upsert?: partiesUpsertWithoutCandidatesInput
    disconnect?: partiesWhereInput | boolean
    delete?: partiesWhereInput | boolean
    connect?: partiesWhereUniqueInput
    update?: XOR<XOR<partiesUpdateToOneWithWhereWithoutCandidatesInput, partiesUpdateWithoutCandidatesInput>, partiesUncheckedUpdateWithoutCandidatesInput>
  }

  export type districtsUpdateOneRequiredWithoutCandidatesNestedInput = {
    create?: XOR<districtsCreateWithoutCandidatesInput, districtsUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: districtsCreateOrConnectWithoutCandidatesInput
    upsert?: districtsUpsertWithoutCandidatesInput
    connect?: districtsWhereUniqueInput
    update?: XOR<XOR<districtsUpdateToOneWithWhereWithoutCandidatesInput, districtsUpdateWithoutCandidatesInput>, districtsUncheckedUpdateWithoutCandidatesInput>
  }

  export type candidatesCreateNestedManyWithoutDistrictsInput = {
    create?: XOR<candidatesCreateWithoutDistrictsInput, candidatesUncheckedCreateWithoutDistrictsInput> | candidatesCreateWithoutDistrictsInput[] | candidatesUncheckedCreateWithoutDistrictsInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutDistrictsInput | candidatesCreateOrConnectWithoutDistrictsInput[]
    createMany?: candidatesCreateManyDistrictsInputEnvelope
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
  }

  export type electionsCreateNestedOneWithoutDistrictsInput = {
    create?: XOR<electionsCreateWithoutDistrictsInput, electionsUncheckedCreateWithoutDistrictsInput>
    connectOrCreate?: electionsCreateOrConnectWithoutDistrictsInput
    connect?: electionsWhereUniqueInput
  }

  export type votersCreateNestedManyWithoutDistrictsInput = {
    create?: XOR<votersCreateWithoutDistrictsInput, votersUncheckedCreateWithoutDistrictsInput> | votersCreateWithoutDistrictsInput[] | votersUncheckedCreateWithoutDistrictsInput[]
    connectOrCreate?: votersCreateOrConnectWithoutDistrictsInput | votersCreateOrConnectWithoutDistrictsInput[]
    createMany?: votersCreateManyDistrictsInputEnvelope
    connect?: votersWhereUniqueInput | votersWhereUniqueInput[]
  }

  export type candidatesUncheckedCreateNestedManyWithoutDistrictsInput = {
    create?: XOR<candidatesCreateWithoutDistrictsInput, candidatesUncheckedCreateWithoutDistrictsInput> | candidatesCreateWithoutDistrictsInput[] | candidatesUncheckedCreateWithoutDistrictsInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutDistrictsInput | candidatesCreateOrConnectWithoutDistrictsInput[]
    createMany?: candidatesCreateManyDistrictsInputEnvelope
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
  }

  export type votersUncheckedCreateNestedManyWithoutDistrictsInput = {
    create?: XOR<votersCreateWithoutDistrictsInput, votersUncheckedCreateWithoutDistrictsInput> | votersCreateWithoutDistrictsInput[] | votersUncheckedCreateWithoutDistrictsInput[]
    connectOrCreate?: votersCreateOrConnectWithoutDistrictsInput | votersCreateOrConnectWithoutDistrictsInput[]
    createMany?: votersCreateManyDistrictsInputEnvelope
    connect?: votersWhereUniqueInput | votersWhereUniqueInput[]
  }

  export type candidatesUpdateManyWithoutDistrictsNestedInput = {
    create?: XOR<candidatesCreateWithoutDistrictsInput, candidatesUncheckedCreateWithoutDistrictsInput> | candidatesCreateWithoutDistrictsInput[] | candidatesUncheckedCreateWithoutDistrictsInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutDistrictsInput | candidatesCreateOrConnectWithoutDistrictsInput[]
    upsert?: candidatesUpsertWithWhereUniqueWithoutDistrictsInput | candidatesUpsertWithWhereUniqueWithoutDistrictsInput[]
    createMany?: candidatesCreateManyDistrictsInputEnvelope
    set?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    disconnect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    delete?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    update?: candidatesUpdateWithWhereUniqueWithoutDistrictsInput | candidatesUpdateWithWhereUniqueWithoutDistrictsInput[]
    updateMany?: candidatesUpdateManyWithWhereWithoutDistrictsInput | candidatesUpdateManyWithWhereWithoutDistrictsInput[]
    deleteMany?: candidatesScalarWhereInput | candidatesScalarWhereInput[]
  }

  export type electionsUpdateOneRequiredWithoutDistrictsNestedInput = {
    create?: XOR<electionsCreateWithoutDistrictsInput, electionsUncheckedCreateWithoutDistrictsInput>
    connectOrCreate?: electionsCreateOrConnectWithoutDistrictsInput
    upsert?: electionsUpsertWithoutDistrictsInput
    connect?: electionsWhereUniqueInput
    update?: XOR<XOR<electionsUpdateToOneWithWhereWithoutDistrictsInput, electionsUpdateWithoutDistrictsInput>, electionsUncheckedUpdateWithoutDistrictsInput>
  }

  export type votersUpdateManyWithoutDistrictsNestedInput = {
    create?: XOR<votersCreateWithoutDistrictsInput, votersUncheckedCreateWithoutDistrictsInput> | votersCreateWithoutDistrictsInput[] | votersUncheckedCreateWithoutDistrictsInput[]
    connectOrCreate?: votersCreateOrConnectWithoutDistrictsInput | votersCreateOrConnectWithoutDistrictsInput[]
    upsert?: votersUpsertWithWhereUniqueWithoutDistrictsInput | votersUpsertWithWhereUniqueWithoutDistrictsInput[]
    createMany?: votersCreateManyDistrictsInputEnvelope
    set?: votersWhereUniqueInput | votersWhereUniqueInput[]
    disconnect?: votersWhereUniqueInput | votersWhereUniqueInput[]
    delete?: votersWhereUniqueInput | votersWhereUniqueInput[]
    connect?: votersWhereUniqueInput | votersWhereUniqueInput[]
    update?: votersUpdateWithWhereUniqueWithoutDistrictsInput | votersUpdateWithWhereUniqueWithoutDistrictsInput[]
    updateMany?: votersUpdateManyWithWhereWithoutDistrictsInput | votersUpdateManyWithWhereWithoutDistrictsInput[]
    deleteMany?: votersScalarWhereInput | votersScalarWhereInput[]
  }

  export type candidatesUncheckedUpdateManyWithoutDistrictsNestedInput = {
    create?: XOR<candidatesCreateWithoutDistrictsInput, candidatesUncheckedCreateWithoutDistrictsInput> | candidatesCreateWithoutDistrictsInput[] | candidatesUncheckedCreateWithoutDistrictsInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutDistrictsInput | candidatesCreateOrConnectWithoutDistrictsInput[]
    upsert?: candidatesUpsertWithWhereUniqueWithoutDistrictsInput | candidatesUpsertWithWhereUniqueWithoutDistrictsInput[]
    createMany?: candidatesCreateManyDistrictsInputEnvelope
    set?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    disconnect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    delete?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    update?: candidatesUpdateWithWhereUniqueWithoutDistrictsInput | candidatesUpdateWithWhereUniqueWithoutDistrictsInput[]
    updateMany?: candidatesUpdateManyWithWhereWithoutDistrictsInput | candidatesUpdateManyWithWhereWithoutDistrictsInput[]
    deleteMany?: candidatesScalarWhereInput | candidatesScalarWhereInput[]
  }

  export type votersUncheckedUpdateManyWithoutDistrictsNestedInput = {
    create?: XOR<votersCreateWithoutDistrictsInput, votersUncheckedCreateWithoutDistrictsInput> | votersCreateWithoutDistrictsInput[] | votersUncheckedCreateWithoutDistrictsInput[]
    connectOrCreate?: votersCreateOrConnectWithoutDistrictsInput | votersCreateOrConnectWithoutDistrictsInput[]
    upsert?: votersUpsertWithWhereUniqueWithoutDistrictsInput | votersUpsertWithWhereUniqueWithoutDistrictsInput[]
    createMany?: votersCreateManyDistrictsInputEnvelope
    set?: votersWhereUniqueInput | votersWhereUniqueInput[]
    disconnect?: votersWhereUniqueInput | votersWhereUniqueInput[]
    delete?: votersWhereUniqueInput | votersWhereUniqueInput[]
    connect?: votersWhereUniqueInput | votersWhereUniqueInput[]
    update?: votersUpdateWithWhereUniqueWithoutDistrictsInput | votersUpdateWithWhereUniqueWithoutDistrictsInput[]
    updateMany?: votersUpdateManyWithWhereWithoutDistrictsInput | votersUpdateManyWithWhereWithoutDistrictsInput[]
    deleteMany?: votersScalarWhereInput | votersScalarWhereInput[]
  }

  export type candidatesCreateNestedManyWithoutElectionsInput = {
    create?: XOR<candidatesCreateWithoutElectionsInput, candidatesUncheckedCreateWithoutElectionsInput> | candidatesCreateWithoutElectionsInput[] | candidatesUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutElectionsInput | candidatesCreateOrConnectWithoutElectionsInput[]
    createMany?: candidatesCreateManyElectionsInputEnvelope
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
  }

  export type districtsCreateNestedManyWithoutElectionsInput = {
    create?: XOR<districtsCreateWithoutElectionsInput, districtsUncheckedCreateWithoutElectionsInput> | districtsCreateWithoutElectionsInput[] | districtsUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: districtsCreateOrConnectWithoutElectionsInput | districtsCreateOrConnectWithoutElectionsInput[]
    createMany?: districtsCreateManyElectionsInputEnvelope
    connect?: districtsWhereUniqueInput | districtsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutElectionsInput = {
    create?: XOR<usersCreateWithoutElectionsInput, usersUncheckedCreateWithoutElectionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutElectionsInput
    connect?: usersWhereUniqueInput
  }

  export type votersCreateNestedManyWithoutElectionsInput = {
    create?: XOR<votersCreateWithoutElectionsInput, votersUncheckedCreateWithoutElectionsInput> | votersCreateWithoutElectionsInput[] | votersUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: votersCreateOrConnectWithoutElectionsInput | votersCreateOrConnectWithoutElectionsInput[]
    createMany?: votersCreateManyElectionsInputEnvelope
    connect?: votersWhereUniqueInput | votersWhereUniqueInput[]
  }

  export type candidatesUncheckedCreateNestedManyWithoutElectionsInput = {
    create?: XOR<candidatesCreateWithoutElectionsInput, candidatesUncheckedCreateWithoutElectionsInput> | candidatesCreateWithoutElectionsInput[] | candidatesUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutElectionsInput | candidatesCreateOrConnectWithoutElectionsInput[]
    createMany?: candidatesCreateManyElectionsInputEnvelope
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
  }

  export type districtsUncheckedCreateNestedManyWithoutElectionsInput = {
    create?: XOR<districtsCreateWithoutElectionsInput, districtsUncheckedCreateWithoutElectionsInput> | districtsCreateWithoutElectionsInput[] | districtsUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: districtsCreateOrConnectWithoutElectionsInput | districtsCreateOrConnectWithoutElectionsInput[]
    createMany?: districtsCreateManyElectionsInputEnvelope
    connect?: districtsWhereUniqueInput | districtsWhereUniqueInput[]
  }

  export type votersUncheckedCreateNestedManyWithoutElectionsInput = {
    create?: XOR<votersCreateWithoutElectionsInput, votersUncheckedCreateWithoutElectionsInput> | votersCreateWithoutElectionsInput[] | votersUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: votersCreateOrConnectWithoutElectionsInput | votersCreateOrConnectWithoutElectionsInput[]
    createMany?: votersCreateManyElectionsInputEnvelope
    connect?: votersWhereUniqueInput | votersWhereUniqueInput[]
  }

  export type NullableEnumelections_statusFieldUpdateOperationsInput = {
    set?: $Enums.elections_status | null
  }

  export type candidatesUpdateManyWithoutElectionsNestedInput = {
    create?: XOR<candidatesCreateWithoutElectionsInput, candidatesUncheckedCreateWithoutElectionsInput> | candidatesCreateWithoutElectionsInput[] | candidatesUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutElectionsInput | candidatesCreateOrConnectWithoutElectionsInput[]
    upsert?: candidatesUpsertWithWhereUniqueWithoutElectionsInput | candidatesUpsertWithWhereUniqueWithoutElectionsInput[]
    createMany?: candidatesCreateManyElectionsInputEnvelope
    set?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    disconnect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    delete?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    update?: candidatesUpdateWithWhereUniqueWithoutElectionsInput | candidatesUpdateWithWhereUniqueWithoutElectionsInput[]
    updateMany?: candidatesUpdateManyWithWhereWithoutElectionsInput | candidatesUpdateManyWithWhereWithoutElectionsInput[]
    deleteMany?: candidatesScalarWhereInput | candidatesScalarWhereInput[]
  }

  export type districtsUpdateManyWithoutElectionsNestedInput = {
    create?: XOR<districtsCreateWithoutElectionsInput, districtsUncheckedCreateWithoutElectionsInput> | districtsCreateWithoutElectionsInput[] | districtsUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: districtsCreateOrConnectWithoutElectionsInput | districtsCreateOrConnectWithoutElectionsInput[]
    upsert?: districtsUpsertWithWhereUniqueWithoutElectionsInput | districtsUpsertWithWhereUniqueWithoutElectionsInput[]
    createMany?: districtsCreateManyElectionsInputEnvelope
    set?: districtsWhereUniqueInput | districtsWhereUniqueInput[]
    disconnect?: districtsWhereUniqueInput | districtsWhereUniqueInput[]
    delete?: districtsWhereUniqueInput | districtsWhereUniqueInput[]
    connect?: districtsWhereUniqueInput | districtsWhereUniqueInput[]
    update?: districtsUpdateWithWhereUniqueWithoutElectionsInput | districtsUpdateWithWhereUniqueWithoutElectionsInput[]
    updateMany?: districtsUpdateManyWithWhereWithoutElectionsInput | districtsUpdateManyWithWhereWithoutElectionsInput[]
    deleteMany?: districtsScalarWhereInput | districtsScalarWhereInput[]
  }

  export type usersUpdateOneWithoutElectionsNestedInput = {
    create?: XOR<usersCreateWithoutElectionsInput, usersUncheckedCreateWithoutElectionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutElectionsInput
    upsert?: usersUpsertWithoutElectionsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutElectionsInput, usersUpdateWithoutElectionsInput>, usersUncheckedUpdateWithoutElectionsInput>
  }

  export type votersUpdateManyWithoutElectionsNestedInput = {
    create?: XOR<votersCreateWithoutElectionsInput, votersUncheckedCreateWithoutElectionsInput> | votersCreateWithoutElectionsInput[] | votersUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: votersCreateOrConnectWithoutElectionsInput | votersCreateOrConnectWithoutElectionsInput[]
    upsert?: votersUpsertWithWhereUniqueWithoutElectionsInput | votersUpsertWithWhereUniqueWithoutElectionsInput[]
    createMany?: votersCreateManyElectionsInputEnvelope
    set?: votersWhereUniqueInput | votersWhereUniqueInput[]
    disconnect?: votersWhereUniqueInput | votersWhereUniqueInput[]
    delete?: votersWhereUniqueInput | votersWhereUniqueInput[]
    connect?: votersWhereUniqueInput | votersWhereUniqueInput[]
    update?: votersUpdateWithWhereUniqueWithoutElectionsInput | votersUpdateWithWhereUniqueWithoutElectionsInput[]
    updateMany?: votersUpdateManyWithWhereWithoutElectionsInput | votersUpdateManyWithWhereWithoutElectionsInput[]
    deleteMany?: votersScalarWhereInput | votersScalarWhereInput[]
  }

  export type candidatesUncheckedUpdateManyWithoutElectionsNestedInput = {
    create?: XOR<candidatesCreateWithoutElectionsInput, candidatesUncheckedCreateWithoutElectionsInput> | candidatesCreateWithoutElectionsInput[] | candidatesUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutElectionsInput | candidatesCreateOrConnectWithoutElectionsInput[]
    upsert?: candidatesUpsertWithWhereUniqueWithoutElectionsInput | candidatesUpsertWithWhereUniqueWithoutElectionsInput[]
    createMany?: candidatesCreateManyElectionsInputEnvelope
    set?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    disconnect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    delete?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    update?: candidatesUpdateWithWhereUniqueWithoutElectionsInput | candidatesUpdateWithWhereUniqueWithoutElectionsInput[]
    updateMany?: candidatesUpdateManyWithWhereWithoutElectionsInput | candidatesUpdateManyWithWhereWithoutElectionsInput[]
    deleteMany?: candidatesScalarWhereInput | candidatesScalarWhereInput[]
  }

  export type districtsUncheckedUpdateManyWithoutElectionsNestedInput = {
    create?: XOR<districtsCreateWithoutElectionsInput, districtsUncheckedCreateWithoutElectionsInput> | districtsCreateWithoutElectionsInput[] | districtsUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: districtsCreateOrConnectWithoutElectionsInput | districtsCreateOrConnectWithoutElectionsInput[]
    upsert?: districtsUpsertWithWhereUniqueWithoutElectionsInput | districtsUpsertWithWhereUniqueWithoutElectionsInput[]
    createMany?: districtsCreateManyElectionsInputEnvelope
    set?: districtsWhereUniqueInput | districtsWhereUniqueInput[]
    disconnect?: districtsWhereUniqueInput | districtsWhereUniqueInput[]
    delete?: districtsWhereUniqueInput | districtsWhereUniqueInput[]
    connect?: districtsWhereUniqueInput | districtsWhereUniqueInput[]
    update?: districtsUpdateWithWhereUniqueWithoutElectionsInput | districtsUpdateWithWhereUniqueWithoutElectionsInput[]
    updateMany?: districtsUpdateManyWithWhereWithoutElectionsInput | districtsUpdateManyWithWhereWithoutElectionsInput[]
    deleteMany?: districtsScalarWhereInput | districtsScalarWhereInput[]
  }

  export type votersUncheckedUpdateManyWithoutElectionsNestedInput = {
    create?: XOR<votersCreateWithoutElectionsInput, votersUncheckedCreateWithoutElectionsInput> | votersCreateWithoutElectionsInput[] | votersUncheckedCreateWithoutElectionsInput[]
    connectOrCreate?: votersCreateOrConnectWithoutElectionsInput | votersCreateOrConnectWithoutElectionsInput[]
    upsert?: votersUpsertWithWhereUniqueWithoutElectionsInput | votersUpsertWithWhereUniqueWithoutElectionsInput[]
    createMany?: votersCreateManyElectionsInputEnvelope
    set?: votersWhereUniqueInput | votersWhereUniqueInput[]
    disconnect?: votersWhereUniqueInput | votersWhereUniqueInput[]
    delete?: votersWhereUniqueInput | votersWhereUniqueInput[]
    connect?: votersWhereUniqueInput | votersWhereUniqueInput[]
    update?: votersUpdateWithWhereUniqueWithoutElectionsInput | votersUpdateWithWhereUniqueWithoutElectionsInput[]
    updateMany?: votersUpdateManyWithWhereWithoutElectionsInput | votersUpdateManyWithWhereWithoutElectionsInput[]
    deleteMany?: votersScalarWhereInput | votersScalarWhereInput[]
  }

  export type candidatesCreateNestedManyWithoutPartiesInput = {
    create?: XOR<candidatesCreateWithoutPartiesInput, candidatesUncheckedCreateWithoutPartiesInput> | candidatesCreateWithoutPartiesInput[] | candidatesUncheckedCreateWithoutPartiesInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutPartiesInput | candidatesCreateOrConnectWithoutPartiesInput[]
    createMany?: candidatesCreateManyPartiesInputEnvelope
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
  }

  export type candidatesUncheckedCreateNestedManyWithoutPartiesInput = {
    create?: XOR<candidatesCreateWithoutPartiesInput, candidatesUncheckedCreateWithoutPartiesInput> | candidatesCreateWithoutPartiesInput[] | candidatesUncheckedCreateWithoutPartiesInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutPartiesInput | candidatesCreateOrConnectWithoutPartiesInput[]
    createMany?: candidatesCreateManyPartiesInputEnvelope
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
  }

  export type candidatesUpdateManyWithoutPartiesNestedInput = {
    create?: XOR<candidatesCreateWithoutPartiesInput, candidatesUncheckedCreateWithoutPartiesInput> | candidatesCreateWithoutPartiesInput[] | candidatesUncheckedCreateWithoutPartiesInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutPartiesInput | candidatesCreateOrConnectWithoutPartiesInput[]
    upsert?: candidatesUpsertWithWhereUniqueWithoutPartiesInput | candidatesUpsertWithWhereUniqueWithoutPartiesInput[]
    createMany?: candidatesCreateManyPartiesInputEnvelope
    set?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    disconnect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    delete?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    update?: candidatesUpdateWithWhereUniqueWithoutPartiesInput | candidatesUpdateWithWhereUniqueWithoutPartiesInput[]
    updateMany?: candidatesUpdateManyWithWhereWithoutPartiesInput | candidatesUpdateManyWithWhereWithoutPartiesInput[]
    deleteMany?: candidatesScalarWhereInput | candidatesScalarWhereInput[]
  }

  export type candidatesUncheckedUpdateManyWithoutPartiesNestedInput = {
    create?: XOR<candidatesCreateWithoutPartiesInput, candidatesUncheckedCreateWithoutPartiesInput> | candidatesCreateWithoutPartiesInput[] | candidatesUncheckedCreateWithoutPartiesInput[]
    connectOrCreate?: candidatesCreateOrConnectWithoutPartiesInput | candidatesCreateOrConnectWithoutPartiesInput[]
    upsert?: candidatesUpsertWithWhereUniqueWithoutPartiesInput | candidatesUpsertWithWhereUniqueWithoutPartiesInput[]
    createMany?: candidatesCreateManyPartiesInputEnvelope
    set?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    disconnect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    delete?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    connect?: candidatesWhereUniqueInput | candidatesWhereUniqueInput[]
    update?: candidatesUpdateWithWhereUniqueWithoutPartiesInput | candidatesUpdateWithWhereUniqueWithoutPartiesInput[]
    updateMany?: candidatesUpdateManyWithWhereWithoutPartiesInput | candidatesUpdateManyWithWhereWithoutPartiesInput[]
    deleteMany?: candidatesScalarWhereInput | candidatesScalarWhereInput[]
  }

  export type electionsCreateNestedOneWithoutVotersInput = {
    create?: XOR<electionsCreateWithoutVotersInput, electionsUncheckedCreateWithoutVotersInput>
    connectOrCreate?: electionsCreateOrConnectWithoutVotersInput
    connect?: electionsWhereUniqueInput
  }

  export type districtsCreateNestedOneWithoutVotersInput = {
    create?: XOR<districtsCreateWithoutVotersInput, districtsUncheckedCreateWithoutVotersInput>
    connectOrCreate?: districtsCreateOrConnectWithoutVotersInput
    connect?: districtsWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type electionsUpdateOneRequiredWithoutVotersNestedInput = {
    create?: XOR<electionsCreateWithoutVotersInput, electionsUncheckedCreateWithoutVotersInput>
    connectOrCreate?: electionsCreateOrConnectWithoutVotersInput
    upsert?: electionsUpsertWithoutVotersInput
    connect?: electionsWhereUniqueInput
    update?: XOR<XOR<electionsUpdateToOneWithWhereWithoutVotersInput, electionsUpdateWithoutVotersInput>, electionsUncheckedUpdateWithoutVotersInput>
  }

  export type districtsUpdateOneWithoutVotersNestedInput = {
    create?: XOR<districtsCreateWithoutVotersInput, districtsUncheckedCreateWithoutVotersInput>
    connectOrCreate?: districtsCreateOrConnectWithoutVotersInput
    upsert?: districtsUpsertWithoutVotersInput
    disconnect?: districtsWhereInput | boolean
    delete?: districtsWhereInput | boolean
    connect?: districtsWhereUniqueInput
    update?: XOR<XOR<districtsUpdateToOneWithWhereWithoutVotersInput, districtsUpdateWithoutVotersInput>, districtsUncheckedUpdateWithoutVotersInput>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumusers_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleFilter<$PrismaModel> | $Enums.users_role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumusers_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[]
    notIn?: $Enums.users_role[]
    not?: NestedEnumusers_roleWithAggregatesFilter<$PrismaModel> | $Enums.users_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_roleFilter<$PrismaModel>
    _max?: NestedEnumusers_roleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumelections_statusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.elections_status | Enumelections_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.elections_status[] | null
    notIn?: $Enums.elections_status[] | null
    not?: NestedEnumelections_statusNullableFilter<$PrismaModel> | $Enums.elections_status | null
  }

  export type NestedEnumelections_statusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.elections_status | Enumelections_statusFieldRefInput<$PrismaModel> | null
    in?: $Enums.elections_status[] | null
    notIn?: $Enums.elections_status[] | null
    not?: NestedEnumelections_statusNullableWithAggregatesFilter<$PrismaModel> | $Enums.elections_status | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumelections_statusNullableFilter<$PrismaModel>
    _max?: NestedEnumelections_statusNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type audit_logsCreateWithoutUsersInput = {
    id?: bigint | number
    action: string
    entity?: string | null
    entity_id?: bigint | number | null
    details?: string | null
    created_at?: Date | string | null
  }

  export type audit_logsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number
    action: string
    entity?: string | null
    entity_id?: bigint | number | null
    details?: string | null
    created_at?: Date | string | null
  }

  export type audit_logsCreateOrConnectWithoutUsersInput = {
    where: audit_logsWhereUniqueInput
    create: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput>
  }

  export type audit_logsCreateManyUsersInputEnvelope = {
    data: audit_logsCreateManyUsersInput | audit_logsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type electionsCreateWithoutUsersInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_at?: Date | string | null
    candidates?: candidatesCreateNestedManyWithoutElectionsInput
    districts?: districtsCreateNestedManyWithoutElectionsInput
    voters?: votersCreateNestedManyWithoutElectionsInput
  }

  export type electionsUncheckedCreateWithoutUsersInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_at?: Date | string | null
    candidates?: candidatesUncheckedCreateNestedManyWithoutElectionsInput
    districts?: districtsUncheckedCreateNestedManyWithoutElectionsInput
    voters?: votersUncheckedCreateNestedManyWithoutElectionsInput
  }

  export type electionsCreateOrConnectWithoutUsersInput = {
    where: electionsWhereUniqueInput
    create: XOR<electionsCreateWithoutUsersInput, electionsUncheckedCreateWithoutUsersInput>
  }

  export type electionsCreateManyUsersInputEnvelope = {
    data: electionsCreateManyUsersInput | electionsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type audit_logsUpsertWithWhereUniqueWithoutUsersInput = {
    where: audit_logsWhereUniqueInput
    update: XOR<audit_logsUpdateWithoutUsersInput, audit_logsUncheckedUpdateWithoutUsersInput>
    create: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput>
  }

  export type audit_logsUpdateWithWhereUniqueWithoutUsersInput = {
    where: audit_logsWhereUniqueInput
    data: XOR<audit_logsUpdateWithoutUsersInput, audit_logsUncheckedUpdateWithoutUsersInput>
  }

  export type audit_logsUpdateManyWithWhereWithoutUsersInput = {
    where: audit_logsScalarWhereInput
    data: XOR<audit_logsUpdateManyMutationInput, audit_logsUncheckedUpdateManyWithoutUsersInput>
  }

  export type audit_logsScalarWhereInput = {
    AND?: audit_logsScalarWhereInput | audit_logsScalarWhereInput[]
    OR?: audit_logsScalarWhereInput[]
    NOT?: audit_logsScalarWhereInput | audit_logsScalarWhereInput[]
    id?: BigIntFilter<"audit_logs"> | bigint | number
    user_id?: BigIntNullableFilter<"audit_logs"> | bigint | number | null
    action?: StringFilter<"audit_logs"> | string
    entity?: StringNullableFilter<"audit_logs"> | string | null
    entity_id?: BigIntNullableFilter<"audit_logs"> | bigint | number | null
    details?: StringNullableFilter<"audit_logs"> | string | null
    created_at?: DateTimeNullableFilter<"audit_logs"> | Date | string | null
  }

  export type electionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: electionsWhereUniqueInput
    update: XOR<electionsUpdateWithoutUsersInput, electionsUncheckedUpdateWithoutUsersInput>
    create: XOR<electionsCreateWithoutUsersInput, electionsUncheckedCreateWithoutUsersInput>
  }

  export type electionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: electionsWhereUniqueInput
    data: XOR<electionsUpdateWithoutUsersInput, electionsUncheckedUpdateWithoutUsersInput>
  }

  export type electionsUpdateManyWithWhereWithoutUsersInput = {
    where: electionsScalarWhereInput
    data: XOR<electionsUpdateManyMutationInput, electionsUncheckedUpdateManyWithoutUsersInput>
  }

  export type electionsScalarWhereInput = {
    AND?: electionsScalarWhereInput | electionsScalarWhereInput[]
    OR?: electionsScalarWhereInput[]
    NOT?: electionsScalarWhereInput | electionsScalarWhereInput[]
    id?: BigIntFilter<"elections"> | bigint | number
    title?: StringFilter<"elections"> | string
    description?: StringNullableFilter<"elections"> | string | null
    start_date?: DateTimeNullableFilter<"elections"> | Date | string | null
    end_date?: DateTimeNullableFilter<"elections"> | Date | string | null
    status?: Enumelections_statusNullableFilter<"elections"> | $Enums.elections_status | null
    contract_address?: StringNullableFilter<"elections"> | string | null
    created_by?: BigIntNullableFilter<"elections"> | bigint | number | null
    created_at?: DateTimeNullableFilter<"elections"> | Date | string | null
  }

  export type usersCreateWithoutAudit_logsInput = {
    id?: bigint | number
    username: string
    password_hash: string
    role: $Enums.users_role
    email?: string | null
    twofa_secret?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    elections?: electionsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutAudit_logsInput = {
    id?: bigint | number
    username: string
    password_hash: string
    role: $Enums.users_role
    email?: string | null
    twofa_secret?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    elections?: electionsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutAudit_logsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutAudit_logsInput, usersUncheckedCreateWithoutAudit_logsInput>
  }

  export type usersUpsertWithoutAudit_logsInput = {
    update: XOR<usersUpdateWithoutAudit_logsInput, usersUncheckedUpdateWithoutAudit_logsInput>
    create: XOR<usersCreateWithoutAudit_logsInput, usersUncheckedCreateWithoutAudit_logsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutAudit_logsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutAudit_logsInput, usersUncheckedUpdateWithoutAudit_logsInput>
  }

  export type usersUpdateWithoutAudit_logsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    email?: NullableStringFieldUpdateOperationsInput | string | null
    twofa_secret?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elections?: electionsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutAudit_logsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    email?: NullableStringFieldUpdateOperationsInput | string | null
    twofa_secret?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elections?: electionsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type electionsCreateWithoutCandidatesInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_at?: Date | string | null
    districts?: districtsCreateNestedManyWithoutElectionsInput
    users?: usersCreateNestedOneWithoutElectionsInput
    voters?: votersCreateNestedManyWithoutElectionsInput
  }

  export type electionsUncheckedCreateWithoutCandidatesInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_by?: bigint | number | null
    created_at?: Date | string | null
    districts?: districtsUncheckedCreateNestedManyWithoutElectionsInput
    voters?: votersUncheckedCreateNestedManyWithoutElectionsInput
  }

  export type electionsCreateOrConnectWithoutCandidatesInput = {
    where: electionsWhereUniqueInput
    create: XOR<electionsCreateWithoutCandidatesInput, electionsUncheckedCreateWithoutCandidatesInput>
  }

  export type partiesCreateWithoutCandidatesInput = {
    id?: bigint | number
    name: string
    abbreviation?: string | null
    logo_url?: string | null
    created_at?: Date | string | null
  }

  export type partiesUncheckedCreateWithoutCandidatesInput = {
    id?: bigint | number
    name: string
    abbreviation?: string | null
    logo_url?: string | null
    created_at?: Date | string | null
  }

  export type partiesCreateOrConnectWithoutCandidatesInput = {
    where: partiesWhereUniqueInput
    create: XOR<partiesCreateWithoutCandidatesInput, partiesUncheckedCreateWithoutCandidatesInput>
  }

  export type districtsCreateWithoutCandidatesInput = {
    id?: bigint | number
    name: string
    description?: string | null
    created_at?: Date | string | null
    elections: electionsCreateNestedOneWithoutDistrictsInput
    voters?: votersCreateNestedManyWithoutDistrictsInput
  }

  export type districtsUncheckedCreateWithoutCandidatesInput = {
    id?: bigint | number
    election_id: bigint | number
    name: string
    description?: string | null
    created_at?: Date | string | null
    voters?: votersUncheckedCreateNestedManyWithoutDistrictsInput
  }

  export type districtsCreateOrConnectWithoutCandidatesInput = {
    where: districtsWhereUniqueInput
    create: XOR<districtsCreateWithoutCandidatesInput, districtsUncheckedCreateWithoutCandidatesInput>
  }

  export type electionsUpsertWithoutCandidatesInput = {
    update: XOR<electionsUpdateWithoutCandidatesInput, electionsUncheckedUpdateWithoutCandidatesInput>
    create: XOR<electionsCreateWithoutCandidatesInput, electionsUncheckedCreateWithoutCandidatesInput>
    where?: electionsWhereInput
  }

  export type electionsUpdateToOneWithWhereWithoutCandidatesInput = {
    where?: electionsWhereInput
    data: XOR<electionsUpdateWithoutCandidatesInput, electionsUncheckedUpdateWithoutCandidatesInput>
  }

  export type electionsUpdateWithoutCandidatesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    districts?: districtsUpdateManyWithoutElectionsNestedInput
    users?: usersUpdateOneWithoutElectionsNestedInput
    voters?: votersUpdateManyWithoutElectionsNestedInput
  }

  export type electionsUncheckedUpdateWithoutCandidatesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    districts?: districtsUncheckedUpdateManyWithoutElectionsNestedInput
    voters?: votersUncheckedUpdateManyWithoutElectionsNestedInput
  }

  export type partiesUpsertWithoutCandidatesInput = {
    update: XOR<partiesUpdateWithoutCandidatesInput, partiesUncheckedUpdateWithoutCandidatesInput>
    create: XOR<partiesCreateWithoutCandidatesInput, partiesUncheckedCreateWithoutCandidatesInput>
    where?: partiesWhereInput
  }

  export type partiesUpdateToOneWithWhereWithoutCandidatesInput = {
    where?: partiesWhereInput
    data: XOR<partiesUpdateWithoutCandidatesInput, partiesUncheckedUpdateWithoutCandidatesInput>
  }

  export type partiesUpdateWithoutCandidatesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    abbreviation?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type partiesUncheckedUpdateWithoutCandidatesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    abbreviation?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type districtsUpsertWithoutCandidatesInput = {
    update: XOR<districtsUpdateWithoutCandidatesInput, districtsUncheckedUpdateWithoutCandidatesInput>
    create: XOR<districtsCreateWithoutCandidatesInput, districtsUncheckedCreateWithoutCandidatesInput>
    where?: districtsWhereInput
  }

  export type districtsUpdateToOneWithWhereWithoutCandidatesInput = {
    where?: districtsWhereInput
    data: XOR<districtsUpdateWithoutCandidatesInput, districtsUncheckedUpdateWithoutCandidatesInput>
  }

  export type districtsUpdateWithoutCandidatesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elections?: electionsUpdateOneRequiredWithoutDistrictsNestedInput
    voters?: votersUpdateManyWithoutDistrictsNestedInput
  }

  export type districtsUncheckedUpdateWithoutCandidatesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    voters?: votersUncheckedUpdateManyWithoutDistrictsNestedInput
  }

  export type candidatesCreateWithoutDistrictsInput = {
    id?: bigint | number
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
    elections: electionsCreateNestedOneWithoutCandidatesInput
    parties?: partiesCreateNestedOneWithoutCandidatesInput
  }

  export type candidatesUncheckedCreateWithoutDistrictsInput = {
    id?: bigint | number
    election_id: bigint | number
    party_id?: bigint | number | null
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
  }

  export type candidatesCreateOrConnectWithoutDistrictsInput = {
    where: candidatesWhereUniqueInput
    create: XOR<candidatesCreateWithoutDistrictsInput, candidatesUncheckedCreateWithoutDistrictsInput>
  }

  export type candidatesCreateManyDistrictsInputEnvelope = {
    data: candidatesCreateManyDistrictsInput | candidatesCreateManyDistrictsInput[]
    skipDuplicates?: boolean
  }

  export type electionsCreateWithoutDistrictsInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_at?: Date | string | null
    candidates?: candidatesCreateNestedManyWithoutElectionsInput
    users?: usersCreateNestedOneWithoutElectionsInput
    voters?: votersCreateNestedManyWithoutElectionsInput
  }

  export type electionsUncheckedCreateWithoutDistrictsInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_by?: bigint | number | null
    created_at?: Date | string | null
    candidates?: candidatesUncheckedCreateNestedManyWithoutElectionsInput
    voters?: votersUncheckedCreateNestedManyWithoutElectionsInput
  }

  export type electionsCreateOrConnectWithoutDistrictsInput = {
    where: electionsWhereUniqueInput
    create: XOR<electionsCreateWithoutDistrictsInput, electionsUncheckedCreateWithoutDistrictsInput>
  }

  export type votersCreateWithoutDistrictsInput = {
    id?: bigint | number
    voter_id: string
    name?: string | null
    public_key?: string | null
    data_encrypted?: string | null
    is_verified?: boolean | null
    created_at?: Date | string | null
    elections: electionsCreateNestedOneWithoutVotersInput
  }

  export type votersUncheckedCreateWithoutDistrictsInput = {
    id?: bigint | number
    election_id: bigint | number
    voter_id: string
    name?: string | null
    public_key?: string | null
    data_encrypted?: string | null
    is_verified?: boolean | null
    created_at?: Date | string | null
  }

  export type votersCreateOrConnectWithoutDistrictsInput = {
    where: votersWhereUniqueInput
    create: XOR<votersCreateWithoutDistrictsInput, votersUncheckedCreateWithoutDistrictsInput>
  }

  export type votersCreateManyDistrictsInputEnvelope = {
    data: votersCreateManyDistrictsInput | votersCreateManyDistrictsInput[]
    skipDuplicates?: boolean
  }

  export type candidatesUpsertWithWhereUniqueWithoutDistrictsInput = {
    where: candidatesWhereUniqueInput
    update: XOR<candidatesUpdateWithoutDistrictsInput, candidatesUncheckedUpdateWithoutDistrictsInput>
    create: XOR<candidatesCreateWithoutDistrictsInput, candidatesUncheckedCreateWithoutDistrictsInput>
  }

  export type candidatesUpdateWithWhereUniqueWithoutDistrictsInput = {
    where: candidatesWhereUniqueInput
    data: XOR<candidatesUpdateWithoutDistrictsInput, candidatesUncheckedUpdateWithoutDistrictsInput>
  }

  export type candidatesUpdateManyWithWhereWithoutDistrictsInput = {
    where: candidatesScalarWhereInput
    data: XOR<candidatesUpdateManyMutationInput, candidatesUncheckedUpdateManyWithoutDistrictsInput>
  }

  export type candidatesScalarWhereInput = {
    AND?: candidatesScalarWhereInput | candidatesScalarWhereInput[]
    OR?: candidatesScalarWhereInput[]
    NOT?: candidatesScalarWhereInput | candidatesScalarWhereInput[]
    id?: BigIntFilter<"candidates"> | bigint | number
    election_id?: BigIntFilter<"candidates"> | bigint | number
    party_id?: BigIntNullableFilter<"candidates"> | bigint | number | null
    district_id?: BigIntFilter<"candidates"> | bigint | number
    name?: StringFilter<"candidates"> | string
    bio?: StringNullableFilter<"candidates"> | string | null
    photo_url?: StringNullableFilter<"candidates"> | string | null
    created_at?: DateTimeNullableFilter<"candidates"> | Date | string | null
  }

  export type electionsUpsertWithoutDistrictsInput = {
    update: XOR<electionsUpdateWithoutDistrictsInput, electionsUncheckedUpdateWithoutDistrictsInput>
    create: XOR<electionsCreateWithoutDistrictsInput, electionsUncheckedCreateWithoutDistrictsInput>
    where?: electionsWhereInput
  }

  export type electionsUpdateToOneWithWhereWithoutDistrictsInput = {
    where?: electionsWhereInput
    data: XOR<electionsUpdateWithoutDistrictsInput, electionsUncheckedUpdateWithoutDistrictsInput>
  }

  export type electionsUpdateWithoutDistrictsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUpdateManyWithoutElectionsNestedInput
    users?: usersUpdateOneWithoutElectionsNestedInput
    voters?: votersUpdateManyWithoutElectionsNestedInput
  }

  export type electionsUncheckedUpdateWithoutDistrictsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUncheckedUpdateManyWithoutElectionsNestedInput
    voters?: votersUncheckedUpdateManyWithoutElectionsNestedInput
  }

  export type votersUpsertWithWhereUniqueWithoutDistrictsInput = {
    where: votersWhereUniqueInput
    update: XOR<votersUpdateWithoutDistrictsInput, votersUncheckedUpdateWithoutDistrictsInput>
    create: XOR<votersCreateWithoutDistrictsInput, votersUncheckedCreateWithoutDistrictsInput>
  }

  export type votersUpdateWithWhereUniqueWithoutDistrictsInput = {
    where: votersWhereUniqueInput
    data: XOR<votersUpdateWithoutDistrictsInput, votersUncheckedUpdateWithoutDistrictsInput>
  }

  export type votersUpdateManyWithWhereWithoutDistrictsInput = {
    where: votersScalarWhereInput
    data: XOR<votersUpdateManyMutationInput, votersUncheckedUpdateManyWithoutDistrictsInput>
  }

  export type votersScalarWhereInput = {
    AND?: votersScalarWhereInput | votersScalarWhereInput[]
    OR?: votersScalarWhereInput[]
    NOT?: votersScalarWhereInput | votersScalarWhereInput[]
    id?: BigIntFilter<"voters"> | bigint | number
    election_id?: BigIntFilter<"voters"> | bigint | number
    district_id?: BigIntNullableFilter<"voters"> | bigint | number | null
    voter_id?: StringFilter<"voters"> | string
    name?: StringNullableFilter<"voters"> | string | null
    public_key?: StringNullableFilter<"voters"> | string | null
    data_encrypted?: StringNullableFilter<"voters"> | string | null
    is_verified?: BoolNullableFilter<"voters"> | boolean | null
    created_at?: DateTimeNullableFilter<"voters"> | Date | string | null
  }

  export type candidatesCreateWithoutElectionsInput = {
    id?: bigint | number
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
    parties?: partiesCreateNestedOneWithoutCandidatesInput
    districts: districtsCreateNestedOneWithoutCandidatesInput
  }

  export type candidatesUncheckedCreateWithoutElectionsInput = {
    id?: bigint | number
    party_id?: bigint | number | null
    district_id: bigint | number
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
  }

  export type candidatesCreateOrConnectWithoutElectionsInput = {
    where: candidatesWhereUniqueInput
    create: XOR<candidatesCreateWithoutElectionsInput, candidatesUncheckedCreateWithoutElectionsInput>
  }

  export type candidatesCreateManyElectionsInputEnvelope = {
    data: candidatesCreateManyElectionsInput | candidatesCreateManyElectionsInput[]
    skipDuplicates?: boolean
  }

  export type districtsCreateWithoutElectionsInput = {
    id?: bigint | number
    name: string
    description?: string | null
    created_at?: Date | string | null
    candidates?: candidatesCreateNestedManyWithoutDistrictsInput
    voters?: votersCreateNestedManyWithoutDistrictsInput
  }

  export type districtsUncheckedCreateWithoutElectionsInput = {
    id?: bigint | number
    name: string
    description?: string | null
    created_at?: Date | string | null
    candidates?: candidatesUncheckedCreateNestedManyWithoutDistrictsInput
    voters?: votersUncheckedCreateNestedManyWithoutDistrictsInput
  }

  export type districtsCreateOrConnectWithoutElectionsInput = {
    where: districtsWhereUniqueInput
    create: XOR<districtsCreateWithoutElectionsInput, districtsUncheckedCreateWithoutElectionsInput>
  }

  export type districtsCreateManyElectionsInputEnvelope = {
    data: districtsCreateManyElectionsInput | districtsCreateManyElectionsInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutElectionsInput = {
    id?: bigint | number
    username: string
    password_hash: string
    role: $Enums.users_role
    email?: string | null
    twofa_secret?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutElectionsInput = {
    id?: bigint | number
    username: string
    password_hash: string
    role: $Enums.users_role
    email?: string | null
    twofa_secret?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutElectionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutElectionsInput, usersUncheckedCreateWithoutElectionsInput>
  }

  export type votersCreateWithoutElectionsInput = {
    id?: bigint | number
    voter_id: string
    name?: string | null
    public_key?: string | null
    data_encrypted?: string | null
    is_verified?: boolean | null
    created_at?: Date | string | null
    districts?: districtsCreateNestedOneWithoutVotersInput
  }

  export type votersUncheckedCreateWithoutElectionsInput = {
    id?: bigint | number
    district_id?: bigint | number | null
    voter_id: string
    name?: string | null
    public_key?: string | null
    data_encrypted?: string | null
    is_verified?: boolean | null
    created_at?: Date | string | null
  }

  export type votersCreateOrConnectWithoutElectionsInput = {
    where: votersWhereUniqueInput
    create: XOR<votersCreateWithoutElectionsInput, votersUncheckedCreateWithoutElectionsInput>
  }

  export type votersCreateManyElectionsInputEnvelope = {
    data: votersCreateManyElectionsInput | votersCreateManyElectionsInput[]
    skipDuplicates?: boolean
  }

  export type candidatesUpsertWithWhereUniqueWithoutElectionsInput = {
    where: candidatesWhereUniqueInput
    update: XOR<candidatesUpdateWithoutElectionsInput, candidatesUncheckedUpdateWithoutElectionsInput>
    create: XOR<candidatesCreateWithoutElectionsInput, candidatesUncheckedCreateWithoutElectionsInput>
  }

  export type candidatesUpdateWithWhereUniqueWithoutElectionsInput = {
    where: candidatesWhereUniqueInput
    data: XOR<candidatesUpdateWithoutElectionsInput, candidatesUncheckedUpdateWithoutElectionsInput>
  }

  export type candidatesUpdateManyWithWhereWithoutElectionsInput = {
    where: candidatesScalarWhereInput
    data: XOR<candidatesUpdateManyMutationInput, candidatesUncheckedUpdateManyWithoutElectionsInput>
  }

  export type districtsUpsertWithWhereUniqueWithoutElectionsInput = {
    where: districtsWhereUniqueInput
    update: XOR<districtsUpdateWithoutElectionsInput, districtsUncheckedUpdateWithoutElectionsInput>
    create: XOR<districtsCreateWithoutElectionsInput, districtsUncheckedCreateWithoutElectionsInput>
  }

  export type districtsUpdateWithWhereUniqueWithoutElectionsInput = {
    where: districtsWhereUniqueInput
    data: XOR<districtsUpdateWithoutElectionsInput, districtsUncheckedUpdateWithoutElectionsInput>
  }

  export type districtsUpdateManyWithWhereWithoutElectionsInput = {
    where: districtsScalarWhereInput
    data: XOR<districtsUpdateManyMutationInput, districtsUncheckedUpdateManyWithoutElectionsInput>
  }

  export type districtsScalarWhereInput = {
    AND?: districtsScalarWhereInput | districtsScalarWhereInput[]
    OR?: districtsScalarWhereInput[]
    NOT?: districtsScalarWhereInput | districtsScalarWhereInput[]
    id?: BigIntFilter<"districts"> | bigint | number
    election_id?: BigIntFilter<"districts"> | bigint | number
    name?: StringFilter<"districts"> | string
    description?: StringNullableFilter<"districts"> | string | null
    created_at?: DateTimeNullableFilter<"districts"> | Date | string | null
  }

  export type usersUpsertWithoutElectionsInput = {
    update: XOR<usersUpdateWithoutElectionsInput, usersUncheckedUpdateWithoutElectionsInput>
    create: XOR<usersCreateWithoutElectionsInput, usersUncheckedCreateWithoutElectionsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutElectionsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutElectionsInput, usersUncheckedUpdateWithoutElectionsInput>
  }

  export type usersUpdateWithoutElectionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    email?: NullableStringFieldUpdateOperationsInput | string | null
    twofa_secret?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutElectionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    email?: NullableStringFieldUpdateOperationsInput | string | null
    twofa_secret?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type votersUpsertWithWhereUniqueWithoutElectionsInput = {
    where: votersWhereUniqueInput
    update: XOR<votersUpdateWithoutElectionsInput, votersUncheckedUpdateWithoutElectionsInput>
    create: XOR<votersCreateWithoutElectionsInput, votersUncheckedCreateWithoutElectionsInput>
  }

  export type votersUpdateWithWhereUniqueWithoutElectionsInput = {
    where: votersWhereUniqueInput
    data: XOR<votersUpdateWithoutElectionsInput, votersUncheckedUpdateWithoutElectionsInput>
  }

  export type votersUpdateManyWithWhereWithoutElectionsInput = {
    where: votersScalarWhereInput
    data: XOR<votersUpdateManyMutationInput, votersUncheckedUpdateManyWithoutElectionsInput>
  }

  export type candidatesCreateWithoutPartiesInput = {
    id?: bigint | number
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
    elections: electionsCreateNestedOneWithoutCandidatesInput
    districts: districtsCreateNestedOneWithoutCandidatesInput
  }

  export type candidatesUncheckedCreateWithoutPartiesInput = {
    id?: bigint | number
    election_id: bigint | number
    district_id: bigint | number
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
  }

  export type candidatesCreateOrConnectWithoutPartiesInput = {
    where: candidatesWhereUniqueInput
    create: XOR<candidatesCreateWithoutPartiesInput, candidatesUncheckedCreateWithoutPartiesInput>
  }

  export type candidatesCreateManyPartiesInputEnvelope = {
    data: candidatesCreateManyPartiesInput | candidatesCreateManyPartiesInput[]
    skipDuplicates?: boolean
  }

  export type candidatesUpsertWithWhereUniqueWithoutPartiesInput = {
    where: candidatesWhereUniqueInput
    update: XOR<candidatesUpdateWithoutPartiesInput, candidatesUncheckedUpdateWithoutPartiesInput>
    create: XOR<candidatesCreateWithoutPartiesInput, candidatesUncheckedCreateWithoutPartiesInput>
  }

  export type candidatesUpdateWithWhereUniqueWithoutPartiesInput = {
    where: candidatesWhereUniqueInput
    data: XOR<candidatesUpdateWithoutPartiesInput, candidatesUncheckedUpdateWithoutPartiesInput>
  }

  export type candidatesUpdateManyWithWhereWithoutPartiesInput = {
    where: candidatesScalarWhereInput
    data: XOR<candidatesUpdateManyMutationInput, candidatesUncheckedUpdateManyWithoutPartiesInput>
  }

  export type electionsCreateWithoutVotersInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_at?: Date | string | null
    candidates?: candidatesCreateNestedManyWithoutElectionsInput
    districts?: districtsCreateNestedManyWithoutElectionsInput
    users?: usersCreateNestedOneWithoutElectionsInput
  }

  export type electionsUncheckedCreateWithoutVotersInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_by?: bigint | number | null
    created_at?: Date | string | null
    candidates?: candidatesUncheckedCreateNestedManyWithoutElectionsInput
    districts?: districtsUncheckedCreateNestedManyWithoutElectionsInput
  }

  export type electionsCreateOrConnectWithoutVotersInput = {
    where: electionsWhereUniqueInput
    create: XOR<electionsCreateWithoutVotersInput, electionsUncheckedCreateWithoutVotersInput>
  }

  export type districtsCreateWithoutVotersInput = {
    id?: bigint | number
    name: string
    description?: string | null
    created_at?: Date | string | null
    candidates?: candidatesCreateNestedManyWithoutDistrictsInput
    elections: electionsCreateNestedOneWithoutDistrictsInput
  }

  export type districtsUncheckedCreateWithoutVotersInput = {
    id?: bigint | number
    election_id: bigint | number
    name: string
    description?: string | null
    created_at?: Date | string | null
    candidates?: candidatesUncheckedCreateNestedManyWithoutDistrictsInput
  }

  export type districtsCreateOrConnectWithoutVotersInput = {
    where: districtsWhereUniqueInput
    create: XOR<districtsCreateWithoutVotersInput, districtsUncheckedCreateWithoutVotersInput>
  }

  export type electionsUpsertWithoutVotersInput = {
    update: XOR<electionsUpdateWithoutVotersInput, electionsUncheckedUpdateWithoutVotersInput>
    create: XOR<electionsCreateWithoutVotersInput, electionsUncheckedCreateWithoutVotersInput>
    where?: electionsWhereInput
  }

  export type electionsUpdateToOneWithWhereWithoutVotersInput = {
    where?: electionsWhereInput
    data: XOR<electionsUpdateWithoutVotersInput, electionsUncheckedUpdateWithoutVotersInput>
  }

  export type electionsUpdateWithoutVotersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUpdateManyWithoutElectionsNestedInput
    districts?: districtsUpdateManyWithoutElectionsNestedInput
    users?: usersUpdateOneWithoutElectionsNestedInput
  }

  export type electionsUncheckedUpdateWithoutVotersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUncheckedUpdateManyWithoutElectionsNestedInput
    districts?: districtsUncheckedUpdateManyWithoutElectionsNestedInput
  }

  export type districtsUpsertWithoutVotersInput = {
    update: XOR<districtsUpdateWithoutVotersInput, districtsUncheckedUpdateWithoutVotersInput>
    create: XOR<districtsCreateWithoutVotersInput, districtsUncheckedCreateWithoutVotersInput>
    where?: districtsWhereInput
  }

  export type districtsUpdateToOneWithWhereWithoutVotersInput = {
    where?: districtsWhereInput
    data: XOR<districtsUpdateWithoutVotersInput, districtsUncheckedUpdateWithoutVotersInput>
  }

  export type districtsUpdateWithoutVotersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUpdateManyWithoutDistrictsNestedInput
    elections?: electionsUpdateOneRequiredWithoutDistrictsNestedInput
  }

  export type districtsUncheckedUpdateWithoutVotersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUncheckedUpdateManyWithoutDistrictsNestedInput
  }

  export type audit_logsCreateManyUsersInput = {
    id?: bigint | number
    action: string
    entity?: string | null
    entity_id?: bigint | number | null
    details?: string | null
    created_at?: Date | string | null
  }

  export type electionsCreateManyUsersInput = {
    id?: bigint | number
    title: string
    description?: string | null
    start_date?: Date | string | null
    end_date?: Date | string | null
    status?: $Enums.elections_status | null
    contract_address?: string | null
    created_at?: Date | string | null
  }

  export type audit_logsUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entity?: NullableStringFieldUpdateOperationsInput | string | null
    entity_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type audit_logsUncheckedUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entity?: NullableStringFieldUpdateOperationsInput | string | null
    entity_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type audit_logsUncheckedUpdateManyWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entity?: NullableStringFieldUpdateOperationsInput | string | null
    entity_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type electionsUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUpdateManyWithoutElectionsNestedInput
    districts?: districtsUpdateManyWithoutElectionsNestedInput
    voters?: votersUpdateManyWithoutElectionsNestedInput
  }

  export type electionsUncheckedUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUncheckedUpdateManyWithoutElectionsNestedInput
    districts?: districtsUncheckedUpdateManyWithoutElectionsNestedInput
    voters?: votersUncheckedUpdateManyWithoutElectionsNestedInput
  }

  export type electionsUncheckedUpdateManyWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: NullableEnumelections_statusFieldUpdateOperationsInput | $Enums.elections_status | null
    contract_address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type candidatesCreateManyDistrictsInput = {
    id?: bigint | number
    election_id: bigint | number
    party_id?: bigint | number | null
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
  }

  export type votersCreateManyDistrictsInput = {
    id?: bigint | number
    election_id: bigint | number
    voter_id: string
    name?: string | null
    public_key?: string | null
    data_encrypted?: string | null
    is_verified?: boolean | null
    created_at?: Date | string | null
  }

  export type candidatesUpdateWithoutDistrictsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elections?: electionsUpdateOneRequiredWithoutCandidatesNestedInput
    parties?: partiesUpdateOneWithoutCandidatesNestedInput
  }

  export type candidatesUncheckedUpdateWithoutDistrictsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    party_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type candidatesUncheckedUpdateManyWithoutDistrictsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    party_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type votersUpdateWithoutDistrictsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    voter_id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    public_key?: NullableStringFieldUpdateOperationsInput | string | null
    data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elections?: electionsUpdateOneRequiredWithoutVotersNestedInput
  }

  export type votersUncheckedUpdateWithoutDistrictsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    voter_id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    public_key?: NullableStringFieldUpdateOperationsInput | string | null
    data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type votersUncheckedUpdateManyWithoutDistrictsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    voter_id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    public_key?: NullableStringFieldUpdateOperationsInput | string | null
    data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type candidatesCreateManyElectionsInput = {
    id?: bigint | number
    party_id?: bigint | number | null
    district_id: bigint | number
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
  }

  export type districtsCreateManyElectionsInput = {
    id?: bigint | number
    name: string
    description?: string | null
    created_at?: Date | string | null
  }

  export type votersCreateManyElectionsInput = {
    id?: bigint | number
    district_id?: bigint | number | null
    voter_id: string
    name?: string | null
    public_key?: string | null
    data_encrypted?: string | null
    is_verified?: boolean | null
    created_at?: Date | string | null
  }

  export type candidatesUpdateWithoutElectionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parties?: partiesUpdateOneWithoutCandidatesNestedInput
    districts?: districtsUpdateOneRequiredWithoutCandidatesNestedInput
  }

  export type candidatesUncheckedUpdateWithoutElectionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    party_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    district_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type candidatesUncheckedUpdateManyWithoutElectionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    party_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    district_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type districtsUpdateWithoutElectionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUpdateManyWithoutDistrictsNestedInput
    voters?: votersUpdateManyWithoutDistrictsNestedInput
  }

  export type districtsUncheckedUpdateWithoutElectionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidates?: candidatesUncheckedUpdateManyWithoutDistrictsNestedInput
    voters?: votersUncheckedUpdateManyWithoutDistrictsNestedInput
  }

  export type districtsUncheckedUpdateManyWithoutElectionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type votersUpdateWithoutElectionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    voter_id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    public_key?: NullableStringFieldUpdateOperationsInput | string | null
    data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    districts?: districtsUpdateOneWithoutVotersNestedInput
  }

  export type votersUncheckedUpdateWithoutElectionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    district_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    voter_id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    public_key?: NullableStringFieldUpdateOperationsInput | string | null
    data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type votersUncheckedUpdateManyWithoutElectionsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    district_id?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    voter_id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    public_key?: NullableStringFieldUpdateOperationsInput | string | null
    data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type candidatesCreateManyPartiesInput = {
    id?: bigint | number
    election_id: bigint | number
    district_id: bigint | number
    name: string
    bio?: string | null
    photo_url?: string | null
    created_at?: Date | string | null
  }

  export type candidatesUpdateWithoutPartiesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    elections?: electionsUpdateOneRequiredWithoutCandidatesNestedInput
    districts?: districtsUpdateOneRequiredWithoutCandidatesNestedInput
  }

  export type candidatesUncheckedUpdateWithoutPartiesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    district_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type candidatesUncheckedUpdateManyWithoutPartiesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    election_id?: BigIntFieldUpdateOperationsInput | bigint | number
    district_id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    photo_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}