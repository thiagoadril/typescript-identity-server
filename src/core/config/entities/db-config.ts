export class DbConfig {
  cassandraContactPoints: string[];
  cassandraLocalDataCenter: string;
  cassandraKeyspace: string;
  cassandraPort: number;
  cassandraAuthEnable: boolean;
  cassandraAuthUsername: string;
  cassandraAuthPassword: string;
  cassandraQueryConsistency: number;

  constructor(cassandraContactPoints: string[], cassandraLocalDataCenter: string,
              cassandraKeyspace: string, cassandraPort: number, cassandraAuthEnable: boolean,
              cassandraAuthUsername: string, cassandraAuthPassword: string,
              cassandraQueryConsistency: number) {
    this.cassandraContactPoints = cassandraContactPoints;
    this.cassandraLocalDataCenter = cassandraLocalDataCenter;
    this.cassandraKeyspace = cassandraKeyspace;
    this.cassandraPort = cassandraPort;
    this.cassandraAuthEnable = cassandraAuthEnable;
    this.cassandraAuthUsername = cassandraAuthUsername;
    this.cassandraAuthPassword = cassandraAuthPassword;
    this.cassandraQueryConsistency = cassandraQueryConsistency;
  }
}
