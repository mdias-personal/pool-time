/* (C)2024 */
package dedham.dias.pool.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "pooluser")
@Table(name = "pooluser")
@Getter
@Setter
public class User {
  public User(UUID id, String fName, String lName, String pnumber, String email, String pword) {
    this.id = id;
    this.fName = fName;
    this.lName = lName;
    this.pnumber = pnumber;
    this.email = email;
    this.pword = pword;
  }

  public User(String loginEmail, String loginPass) {
    this.email = loginEmail;
    this.pword = loginPass;
  }

  public User() {}

  @Id private UUID id;

  @Column(name = "fname")
  private String fName;

  @Column(name = "lname")
  private String lName;

  private String email;
  private String pnumber;
  private String pword;

  @Column(name = "poolscore")
  private int poolScore;

  private Boolean approved;
  private Boolean admin;
}
